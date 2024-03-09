import { useEffect } from "react";

function Toast({ setToast, text }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className="toast">
      <p>{text}</p>
    </div>
  );
}

export default Toast;
