import useAlertContext from "hooks/useAlertContext";
import { AlertType } from "context/alertContext";

const SuccessAlert = (text: string) => {
  return <div className="alert alert-success shadow-lg">{text}</div>;
};

const ErrorAlert = (text: string) => {
  return <div className="alert alert-error shadow-lg">{text}</div>;
};

const WarningAlert = (text: string) => {
  return <div className="alert alert-warning shadow-lg">{text}</div>;
};

const InfoAlert = (text: string) => {
  return <div className="alert alert-info shadow-lg">{text}</div>;
};

const Alert = () => {
  const context = useAlertContext();
  const { isOpen, alert } = context;

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-1/2 z-50  p-4">
      {
        {
          [AlertType.success]: SuccessAlert(alert.content),
          [AlertType.error]: ErrorAlert(alert.content),
          [AlertType.warning]: WarningAlert(alert.content),
          [AlertType.info]: InfoAlert(alert.content),
        }[alert.type]
      }
    </div>
  );
};

export default Alert;
