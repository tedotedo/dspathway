import { useState } from 'react'
import { useAccessibility } from '../../contexts/AccessibilityContext'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

export function FeedbackButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const { settings } = useAccessibility()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setStatus('sending')

    try {
      const response = await fetch('/.netlify/functions/send-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          email: email.trim() || undefined,
          page: window.location.pathname,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('')
        setEmail('')
        setTimeout(() => {
          setIsModalOpen(false)
          setStatus('idle')
        }, 2000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const closeModal = () => {
    if (status !== 'sending') {
      setIsModalOpen(false)
      setStatus('idle')
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        className="fixed right-4 bottom-24 md:bottom-6 z-30 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group animate-pulse-subtle"
        aria-label={settings.easyRead ? 'Tell us what you think' : 'Give feedback to help make the app even better'}
      >
        <span className="text-lg flex-shrink-0 animate-bounce-gentle">💬</span>
        <span
          className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-out ${
            isExpanded ? 'max-w-64 opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          {settings.easyRead ? 'Tell us what you think!' : 'Help make the app even better!'}
        </span>
      </button>

      {/* Modal overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">💬</span>
              <div>
                <h2 className="text-xl font-bold text-warm-800">
                  {settings.easyRead ? 'Tell Us What You Think' : 'Share your feedback'}
                </h2>
                <p className="text-sm text-warm-500">
                  {settings.easyRead
                    ? 'Help us make this app better!'
                    : 'Help us make DS Pathway even better!'}
                </p>
              </div>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8">
                <span className="text-5xl block mb-4">🎉</span>
                <p className="text-lg font-semibold text-warm-800">
                  {settings.easyRead ? 'Thank you!' : 'Thank you!'}
                </p>
                <p className="text-warm-500">
                  {settings.easyRead ? 'We got your message.' : 'Your feedback has been sent.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="feedback-message" className="block text-sm font-medium text-warm-700 mb-1">
                    {settings.easyRead ? 'Your message' : 'Your feedback'} <span className="text-primary-500">*</span>
                  </label>
                  <textarea
                    id="feedback-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={settings.easyRead
                      ? 'Tell us what you think or if something is wrong...'
                      : 'Tell us what you think, report a bug, or suggest an improvement...'}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-300 resize-none"
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                <div>
                  <label htmlFor="feedback-email" className="block text-sm font-medium text-warm-700 mb-1">
                    {settings.easyRead ? 'Your email' : 'Your email'} <span className="text-warm-400">({settings.easyRead ? 'if you want' : 'optional'})</span>
                  </label>
                  <input
                    id="feedback-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={settings.easyRead ? 'So we can reply to you' : 'In case we need to follow up'}
                    className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-300"
                    disabled={status === 'sending'}
                  />
                </div>

                {status === 'error' && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    {settings.easyRead
                      ? 'Something went wrong. Please try again.'
                      : 'Something went wrong. Please try again or email us directly.'}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 rounded-xl border border-warm-200 text-warm-600 font-medium hover:bg-warm-50 transition-colors"
                    disabled={status === 'sending'}
                  >
                    {settings.easyRead ? 'Close' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold shadow-card hover:shadow-card-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={status === 'sending' || !message.trim()}
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span> {settings.easyRead ? 'Sending...' : 'Sending...'}
                      </span>
                    ) : (
                      settings.easyRead ? 'Send' : 'Send feedback'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
