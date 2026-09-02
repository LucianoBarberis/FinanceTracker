import Loading from '../Loading/Loading'
import './WakeUpModal.css'

const WakeUpModal = ({ status = 'checking', attempts = 0, maxAttempts = 20, onRetry }) => {
  const isFailed = status === 'failed'
  const isWaking = status === 'waking'
  const isChecking = status === 'checking'
  const progress = Math.min((attempts / maxAttempts) * 100, 100)

  const title = isFailed ? 'No pudimos despertar al servidor' : 'Despertando el servidor'
  const subtitle = isFailed
    ? 'El servidor no respondió después de varios intentos. Puede estar temporalmente no disponible.'
    : 'Este proyecto usa hosting gratuito y el servidor puede tardar unos 30 segundos en iniciar si estuvo inactivo.'

  return (
    <div
      className="wakeUpOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wakeUpTitle"
      aria-describedby="wakeUpDesc"
    >
      <div className="wakeUpCard">
        {!isFailed && (
          <div className="wakeUpSpinner" aria-hidden="true">
            <Loading size="lg" />
          </div>
        )}

        {isFailed && (
          <div className="wakeUpErrorIcon" aria-hidden="true">
            <span>⚠️</span>
          </div>
        )}

        <h2 id="wakeUpTitle" className="wakeUpTitle">
          {title}
        </h2>
        <p id="wakeUpDesc" className="wakeUpSubtitle">
          {subtitle}
        </p>

        {!isFailed && (
          <>
            <div className="wakeUpProgressTrack" aria-hidden="true">
              <div className="wakeUpProgressFill" style={{ width: `${progress}%` }} />
            </div>

            <p className="wakeUpAttempts" aria-live="polite" aria-atomic="true">
              {isChecking ? 'Verificando conexión…' : `Intento ${attempts}/${maxAttempts}`}
            </p>

            <p className="wakeUpHint">Por favor, mantén esta ventana abierta.</p>
          </>
        )}

        {isFailed && (
          <>
            <p className="wakeUpAttempts" aria-live="assertive">
              Se alcanzó el límite de {maxAttempts} intentos.
            </p>
            <button type="button" className="wakeUpRetryBtn" onClick={onRetry}>
              Reintentar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default WakeUpModal
