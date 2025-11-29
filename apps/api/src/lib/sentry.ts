import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration,  } from '@sentry/profiling-node'

export function initSentry() {
    if (!process.env.SENTRY_DSN) {
        console.warn(" SENTRY_DSN not set. Error tracking disabled");
        return
    }

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',


      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

      integrations: [
         nodeProfilingIntegration(),
      ],

      beforeSend(event) {
      if (event.request?.headers) {
        delete event.request.headers.authorization;
        delete event.request.cookies;
      }

      if (event.request?.url?.includes('/health')) {
        return null;
      }

      return event;
    },

    ignoreErrors: [
      'UNAUTHORIZED',
      'FORBIDDEN',
      'NOT_FOUND',
      'TOO_MANY_REQUESTS',
    ],
  });

  console.log('Sentry SDK Initialized');
}

// export function setupSentryFastify(app: FastifyInstance) {
//     if(!process.env.SENTRY_DSN) return;

//     app.register(fastifyIntegration());
// }

export function setupSentryInstrumentation() {
  if (!process.env.SENTRY_DSN) return;

  Sentry.setupFastifyErrorHandler;
}

export function captureException(error: Error, context?: Record<string, any>) {
    Sentry.captureException(error, {
        extra: context
    })
}



export function addBreadCrumb(message: string, data?: Record<string, any>) {
    Sentry.addBreadcrumb({
        message,
        level: 'info',
        data,
    })
}


export function  setUser(user: {id: string; email?: string; orgId?: string}) {
    Sentry.setUser({
        id: user.id,
        email: user.email,
        orgId: user.orgId
    })
}


export function clearUser() {
    Sentry.setUser(null)
}