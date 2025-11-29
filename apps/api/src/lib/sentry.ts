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
      //  nodeProfilingIntegration(),
      Sentry.httpIntegration(),
      Sentry.nativeNodeFetchIntegration(),
      Sentry.prismaIntegration(),
      Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
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
    extra: context,
    level: 'error',
  });
}

export function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info'
) {
  Sentry.captureMessage(message, level);
}

export function addBreadCrumb(
  message: string,
  data?: Record<string, any>,
  category?: string
) {
  Sentry.addBreadcrumb({
    message,
    level: 'info',
    data,
    category: category || 'custom',
    timestamp: Date.now() / 1000,
  });
}


export function setUser(user: {
  id: string;
  email?: string;
  orgId?: string;
  username?: string;
}) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    orgId: user.orgId,
    username: user.username,
  });
}


export function clearUser() {
  Sentry.setUser(null);
}

export function setTag(key: string, value: string) {
  Sentry.setTag(key, value);
}

export function setTags(tags: Record<string, string>) {
  Sentry.setTags(tags);
}

export function startTransaction(name: string, op: string) {
  return Sentry.startInactiveSpan({
    name,
    op,
  });
}

export function withSentry<T>(fn: () => Promise<T>): Promise<T> {
  return Sentry.startSpan({ name: fn.name || 'anonymous' }, async () => {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof Error) {
        captureException(error);
      }
      throw error;
    }
  });
}
