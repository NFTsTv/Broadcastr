import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { useState } from "react";

interface Props {
  title: string;
}

export function ShareBox({ title }: Props) {
  const url = window.location.href;
  url.replace("golive", "view");

  return (
    <div className="space-y-4">
      <div className="text-lg">Share via...</div>
      <div className="flex space-x-4 justify-center">
        <FacebookShareButton url={url} title={title}>
          <FacebookIcon />
          Facebook
        </FacebookShareButton>
        <TelegramShareButton url={url} title={title}>
          <TelegramIcon />
          Telegram
        </TelegramShareButton>
        <RedditShareButton url={url} title={title}>
          <RedditIcon />
          Reddit
        </RedditShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon />
          Twitter
        </TwitterShareButton>
      </div>
    </div>
  );
}
