import { useToast } from '../../hooks/useToast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './'
import styles from './toast.module.css'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider duration={3500}>
      {toasts.map(function ({
        id,
        title,
        icon,
        description,
        action,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className={styles.toastWrapper}>
              <div className={styles.toastContent}>
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
                <div className={styles.toastActions}>{action}</div>
              </div>
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
