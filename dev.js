(()=> {
  
  State.canvasContext = State.canvasEl.getContext("2d");
  
  var setts = false; //put some defaults
  function on_cam_success(camStream){
    //we've connected with a webcam, save the resolution
    
    try{
      var tracks = camStream.getVideoTracks();
      for(var trk in tracks){
        //if (tracks[trk].kind != "video"){continue;}
        var cap = tracks[trk].getCapabilities();
        setts = tracks[trk].getSettings();
        console.log("Track capa/settings: ", tracks[trk], cap, setts);
        var cnstr = {};
        if (cap.frameRate && cap.frameRate.max){
          cnstr.frameRate = {ideal:cap.frameRate.max, min:cap.frameRate.min, max:(cap.frameRate.max>30 ? 30 : cap.frameRate.max)};
        }
        //if (cap.aspectRatio){
        //  cnstr.aspectRatio = {ideal:16/9, min:4/3, max:16/9};
        //}
        if (cap.facingMode && cap.facingMode.length){
          for (var face in cap.facingMode){
            if (cap.facingMode[face] == "environment"){
              cnstr.facingMode = {exact:cap.facingMode[face]};
            }
          }
          State.toggleCameraBt.disabled = false;
        }
        else {
          State.toggleCameraBt.disabled = true;
        }
        var empty = true;
        for (var i in cnstr){empty = false;}
        if (!empty){
          tracks[trk].applyConstraints(cnstr);
          setts = tracks[trk].getSettings();
          console.log("After applying constraint: ", cnstr, setts);
        }
      }
    }catch(e){
      console.log("Capa errror (ignoring):", e);
    }
    State.camStream = camStream;
    if (setts.width){State.camVideo.width = setts.width;}
    if (setts.height){State.camVideo.height = setts.height;}
    State.camVideo.volume = 0;
    State.camVideo.muted = true;
    State.camVideo.srcObject = camStream;
    State.camVideo.play();
    on_continue_streaming();
  };
  
  function on_got_stream_success(stream,facingMode) {
    facingMode = (facingMode ? {facingMode: facingMode} : true);
    
    //try to access the webcam - if it fails, try audio or video only
    try{
      console.log("Got access to user media:", navigator.mediaDevices.getSupportedConstraints());
    }catch(e){
      console.log("Capa errror (ignoring):", e);
    }
    State.localStream = stream;
    try{
      navigator.mediaDevices.getUserMedia({audio: true, video: facingMode}).then(function(stream){
        if (State.toggleCameraBt) { State.toggleCameraBt.disabled = false; }
        on_cam_success(stream);
      }).catch(function(e){
        console.error("Could not get cam+mic.", e);
        
        try{
          navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(function(stream){
            State.do_framerate_thing = true;
            if (State.toggleCameraBt) { State.toggleCameraBt.disabled = true; }
            on_cam_success(stream);
          }).catch(function(e){
            console.error("Could not get just mic.", e);
            
            navigator.mediaDevices.getUserMedia({audio: false, video: facingMode}).then(function(stream){
              if (State.toggleCameraBt) { State.toggleCameraBt.disabled = false; }
              on_cam_success(stream);
            }).catch(function(e){
              if (State.toggleCameraBt) { State.toggleCameraBt.disabled = true; }
              console.error("Could not get just cam.",e);
              on_continue_streaming();
            });
            
          });
        }catch(e){
          if (State.toggleCameraBt) { State.toggleCameraBt.disabled = true; }
          on_continue_streaming();
        }
      });
    }
    catch(e){
      console.warn("Are you accessing this page through HTTPS? You should in order to use the webcam.");
      if (State.toggleCameraBt) { State.toggleCameraBt.disabled = true; }
      on_continue_streaming();
    }
  };
  
  function init_poings() {
    //add an audio track for the poings
    
    var actx = new (window.AudioContext || window.webkitAudioContext);
    this.destination = actx.createMediaStreamDestination();
    
    if (State.camStream && State.camStream.getAudioTracks().length) {
      //add sound from camStream
      var source = actx.createMediaStreamSource(State.camStream);
      source.connect(destination);
    }
    
    this.playTone = function (freq,timeout) {
      if (!freq) { freq = 440; }        //frequency of the tone, in Hz
      if (!timeout) { timeout = 250; }  //how long the tone is played, in ms
      
      var gainNode = actx.createGain();
      gainNode.connect(this.destination);
      gainNode.connect(actx.destination);
      
      var osc = actx.createOscillator();
      osc.connect(gainNode);
      
      osc.type = "sine";
      osc.frequency.value = freq;
      
      //start playing note
      osc.start();
      osc.stop(actx.currentTime + 10);
      
      //fade out the note
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,                               //may not be 0
        actx.currentTime + timeout*1e-3      //when the volume level should be reached
      );
      
      return osc;
    };
    this.playToneOnce = function(freq,timeout) {
      if (this.playingTone) { return; }
      
      if (!freq) { freq = 440; }        //frequency of the tone, in Hz
      if (!timeout) { timeout = 250; }  //how long the tone is played, in ms
      this.playTone(freq,timeout);
      this.playingTone = true;
      setTimeout(function(){
        this.playingTone = false;
      },timeout);
    }
    
    return this;
  };
  
  
  //This function is called regardless of webcam feed success/fail - we will use the canvas to transmit video
  function on_continue_streaming(){
    //set up WebRTC connection
    if (State.isStreaming) { return; }
    State.peerConn = new RTCPeerConnection();
    var newStream = new MediaStream();
    try{
      if (State.do_poings) {
        State.poings = init_poings();
        
        newStream.addTrack(State.poings.destination.stream.getAudioTracks()[0]);
      }
      else {
        newStream.addTrack(State.camStream.getAudioTracks()[0]);
      }
    }catch(e){
      console.warn("Failed to add audio track",e);
    }
    newStream.addTrack(State.localStream.getVideoTracks()[0]);
    State.peerConn.addStream(newStream);
    State.peerConn
    .createOffer({offerToReceiveVideo: false, offerToReceiveAudio: false})
    .then(function(offer) {
      console.log("Got offer.");
      //console.log(offer.sdp);
      State.localOfferSDP = offer.sdp;
      State.peerConn
      .setLocalDescription(offer)
      .then(function(){
        console.log("Set the local offer.");
        document.body.classList.add("is-streaming");
        State.isStreaming = true;
        State.signaling.sendVideoBitrate(State.streamBitrateEl.value);
        State.signaling.sendOfferSDP(State.localOfferSDP);
      }, function(err){
        console.error("Failed to set the local offer.");
        console.error(err);
      });
    }, function (err) {
      console.error("Failed to get offer.");
      console.error(err);
    });
  }
  
  function on_set_answer_success() {
    console.log("Set the remote answer.");
    document.body.classList.add("is-streaming");
    State.isStreaming = true;
    State.frameCount = 0;
    State.nextFrame = window.requestAnimationFrame(draw);
  };
  
  function on_set_answer_error(error) {
    console.error("Failed to set the remote answer.",error);
  };
  
  /* Mist Signaling event handler. */
  /* -------------------------------------- */
  function on_mist_connected() {
    var stream = State.canvasEl.captureStream(30);
    if (stream) {
      on_got_stream_success(stream);
    }
    else {
      console.error("Failed to access canvas stream.");
      State.startStreamingBt.disabled = false;
    }
  };
  
  function on_mist_disconnected() {
    delete State.signaling;
    State.signaling = null;
    document.body.classList.remove("is-streaming");
    State.isStreaming = false;
    State.startStreamingBt.disabled = false;
    if (State.toggleCameraBt) { State.toggleCameraBt.disabled = true; }
    if (State.nextFrame != null){
      window.cancelAnimationFrame(State.nextFrame);
      State.nextFrame = null;
    }
  };
  
  function on_mist_answer_sdp(ev) {
    if (!ev.result) {
      console.error("MistServer rejected the stream. See server logs.");
      on_mist_disconnected();
      return;
    }
    console.log("Received answer SDP.");
    //console.log(ev.answer_sdp);
    var opts = { type: "answer", sdp: ev.answer_sdp };
    var answer = new RTCSessionDescription(opts);
    State.peerConn
    .setRemoteDescription(answer)
    .then(on_set_answer_success, on_set_answer_error);
  };
  
  function on_mist_video_bitrate(ev) {
    console.log("Video bitrate update to:", ev.video_bitrate);
  };
  
  function on_mist_error(ev) {
    console.error(ev.message);
  };
  
  function on_event(ev) {
    switch (ev.type) {
      case "on_connected":     { on_mist_connected();       break; }
      case "on_disconnected":  { on_mist_disconnected();    break; }
      case "on_answer_sdp":    { on_mist_answer_sdp(ev);    break; }
      case "on_error":         { on_mist_error(ev);         break; }
      case "on_video_bitrate": { on_mist_video_bitrate(ev); break; }
      case "on_media_receive": { 
        if (State.debugEl) {
          State.debugEl.innerHTML = new Date().toLocaleTimeString()+" \n"+JSON.stringify(ev,undefined,2);
        }
        break;
      }
      default: {
        console.warn("Unhandled event:", ev.type, ev);
        break;
      }
    }
  };
  
  function zPad(v, l){
    while ((v+"").length < l){
      v = "0"+v;
    }
    return v;
  }
  function draw(currTime) {
    if (!State.frameCount){
      State.firstFrame = currTime;
    }
    var t = currTime - State.firstFrame;
    var ctx = State.canvasContext;
    var radius;
    var altMode = false;
    if (Math.round(t/6660)%2){altMode = true;}
    if (altMode){
      radius = (5 + Math.sin((t/500)*Math.PI)) * 5;
      ctx.fillStyle = "#112233";
    }else{
      radius = (10 + Math.sin((t/500)*Math.PI)) * 25;
      ctx.fillStyle = "#AAAAFF";
    }
    State.frameCount++;
    ctx.fillRect(0, 0, c_w, c_h);
    
    //draw the stream from the webcam onto the canvas, if applicable
    if ((State.camStream != null) && (State.camStream.getVideoTracks().length)){
      if (State.do_framerate_thing) { ctx.globalAlpha = 0.4; }
      if (setts && setts.width && setts.height){
        var s_w = setts.width;
        var s_h = setts.height;
        if (setts.width / c_w >= setts.height / c_h){
          //height fits, width needs trimming
          s_w = c_w * (setts.height / c_h);
        }else{
          //width fits, height needs trimming
          s_h = c_h * (setts.width / c_w);
        }
        //console.log(setts.width, setts.height, s_w, s_h, c_w, c_h);
        ctx.drawImage(State.camVideo, (setts.width-s_w)/2, (setts.height-s_h)/2, s_w, s_h, 0, 0, c_w, c_h);
      }else {
        ctx.drawImage(State.camVideo, 0, 0, c_w, c_h);
      }
      ctx.globalAlpha = 1;
    }
    
    if (State.do_framerate_thing) { 
      //draw rotating circles and framerate text on the canvas
      
      ctx.beginPath();
      ctx.arc(c_w * 0.5, c_h * 0.5, radius, t/100, t/100+Math.PI, false);
      ctx.arc(c_w * 0.5, c_h * 0.5, radius, t/100+1, t/100+Math.PI+1, true);
      ctx.closePath();
      if (altMode){
        ctx.fillStyle = "#AAAAFF";
      }else{
        ctx.fillStyle = "#006699";
      }
      ctx.fill();
      
      if (altMode){
        ctx.fillStyle = "#FFFFFF";
      }else{
        ctx.fillStyle = "#000000";
      }
      ctx.font = "bold 32px sans-serif";
      var runSince = Math.floor(t/3600000)+":" + zPad(Math.floor((t%3600000)/60000), 2) + ":" + zPad(Math.floor((t % 60000)/1000), 2) + "." + zPad(Math.floor(t%1000), 3) + "ms"
      ctx.textAlign = "center";
      ctx.fillText("Frame " + State.frameCount, (c_w / 2), (c_h / 2) - 16);
      ctx.fillText("Running for " + runSince, (c_w / 2), (c_h / 2) + 16);
      var d = new Date(); 
      var dt = d.getFullYear() + "/" + zPad(d.getMonth()+1, 2)  + "/" + zPad(d.getDate(), 2) + ", "  + zPad(d.getHours(), 2) + ":"  + zPad(d.getMinutes(), 2) + ":" + zPad(d.getSeconds(), 2);
      ctx.fillText(dt, (c_w / 2), (c_h / 2) + 16+32);
      
      if (State.do_poings && State.poings) {
        //draw a bouncing ball on the canvas, and play a sound when they hit the "floor"
        function ball(x,r,freq,phase) {
          if (!phase) { phase = 0; }
          
          function circle(x,y,r) {
            ctx.beginPath();
            ctx.arc(
              x,
              y,
              r,
              0,        //start angle
              Math.PI*2 //end angle
            );
            ctx.closePath();
            ctx.fill();
          }
          function line(x1,y1,x2,y2) {
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.closePath();
            ctx.stroke();
          }
          function bounce() {
            var bounceheight = c_h*0.4;
            var period = 5; //(seconds)
            var t = (currTime * 1e-3 + phase*period) % period;
            var s = 4*bounceheight/period*t*(1-t/period);

            if (t < 0.1) {
              State.poings.playToneOnce(freq);
              ctx.fillStyle = altMode ? "#FFF" : "#000";
            }

            return s;
          }
          
          ctx.strokeStyle = "#000";
          ctx.fillStyle = altMode ? "#AAF" : "#069";
          line(
            x-c_w*0.1, c_h*0.7,
            x+c_w*0.1, c_h*0.7
          );
          circle(
            x,
            c_h*0.7-r-bounce(), //y
            r       
          );
          
        }
        ball(
          c_w*0.15, //x
          c_h/20,   //r,
          392       //frequency of poing
        );
        ball(
          c_w*0.85, //x
          c_h/30,   //r,
          440,      //frequency of poing
          0.5       //phase shift (% of period to shift with)
        );
      }
      
    }
    
    State.nextFrame = window.requestAnimationFrame(draw);
  }
  
  function store_addresses() {
    var addresses = localStorage.getItem("history-addresses") || new Array();
    if (addresses.constructor === String) {
      addresses = JSON.parse(addresses);
    }
    
    if (State.streamAddressEl) {
      addresses.push(State.streamAddressEl.value +" â†’ " +State.streamNameEl.value);
    }
    var unique_addresses = addresses.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    if (unique_addresses.length > 0) {
      unique_addresses = unique_addresses.slice(0,10)
      localStorage.setItem("history-addresses", JSON.stringify(unique_addresses));
    }
  }
  
  function store_state() {
    if (State.streamAddressEl) {
      localStorage.setItem("stream-address", State.streamAddressEl.value);
    }
    localStorage.setItem("stream-name", State.streamNameEl.value);
    localStorage.setItem("stream-bitrate", State.streamBitrateEl.value);
    store_addresses();
  };
  
  function retrieve_state() {
    var address = localStorage.getItem("stream-address");
    var name = localStorage.getItem("stream-name") || "live";
    var bitrate = localStorage.getItem("stream-bitrate");
    if (!address) {
      address = document.location.hostname +"/mist/";
    }
    bitrate = parseInt(bitrate);
    if (State.streamAddressEl) {
      State.streamAddressEl.value = address;
    }
    State.streamNameEl.value = name;
    if (bitrate) State.streamBitrateEl.value = bitrate;
  };
  
  
  State.startStreamingBt.onclick = function (ev) {
    console.log("Requesting user media.");
    State.startStreamingBt.disabled = true;
    State.stopStreamingBt.disabled = false;
    if (State.debugEl) { State.debugEl.innerHTML = ""; }
    store_state();
    try {
      State.signaling = new MistWebRTCSignaling({
        streamName: State.streamNameEl.value,
        signalingURL: ((document.location.protocol != "https:")? "ws://" : "wss://")+(State.streamAddressEl ? State.streamAddressEl.value : State.streamAddress)+"/webrtc",
        onEvent: on_event,
      });
    }
    catch (err) {
      console.error("Failed to create the MistWebRTCSignaling.");
      console.error(err);
    }
  };
  State.stopStreamingBt.onclick = function (ev) {
    console.log("Stop streaming.");
    State.stopStreamingBt.disabled = true;
    State.startStreamingBt.disabled = false;
    State.signaling.stopStreaming();
    if (State.camStream) {
      var t = State.camStream.getTracks();
      for (var i in t) {
        t[i].stop();
      }
    }
  };
  State.canvasEl.ondblclick = function (ev) {
    document.body.classList.add("quick-select");
    var addresses = localStorage.getItem("history-addresses") || new Array();
    if (addresses.constructor === String) {
      addresses = JSON.parse(addresses);
    }
    var html = '<ul>';
    for (var i = 0; i < addresses.length; ++i) {
      html += `<li>${addresses[i]}</li>`
    }
    html += '</ul>';
    html += '<button id="history-close">Close</button>';
    html += '<button id="history-remove">Remove all</button>';
    State.historyEl.innerHTML = html;
    State.historyEl.querySelectorAll('li').forEach((el) => {
      el.onclick = (ev) => {
        ev.preventDefault();
        var info = ev.currentTarget.innerText.split(" â†’ ");
        State.streamAddressEl.value = info[0];
        State.streamNameEl.value = info[1];
        document.body.classList.remove("quick-select");
      }
    });
    State.historyEl.querySelector('#history-close').onclick = () => {
      document.body.classList.remove('quick-select');
    };
    State.historyEl.querySelector('#history-remove').onclick = () => {
      localStorage.removeItem('history-addresses');
      document.body.classList.remove('quick-select');
    };
  };
  
  if (State.toggleCameraBt) {
    State.toggleCameraBt.disabled = true;
    State.toggleCameraBt.addEventListener("click",function(){
      if (!State.isStreaming) { return; }
      
      var current = State.camStream.getVideoTracks()[0].getSettings();
      current = (current.facingMode == "environment" ? "user" : "environment" );
      
      //stop the current stream to release the webcam
      State.camStream.getVideoTracks()[0].stop();
      
      on_got_stream_success(State.localStream,current);
    });
  }
  
  if (State.toggleFramerateThingBt) {
    State.toggleFramerateThingBt.addEventListener("click",function(){
      State.do_framerate_thing = !State.do_framerate_thing;
    });
  }
  
  retrieve_state();
  
})();
