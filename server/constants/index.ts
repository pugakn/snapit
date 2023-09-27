export const DB_TABLES = {
    PROFILES: 'profiles',
}

export const BUCKET_NAMES = {
    AVATARS: 'avatars',
    IMAGES: 'images',
}

export const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}

export const ERROR_MESSAGES = {
    INVALID_REQUEST: 'Invalid request',
    UNAUTHORIZED: 'Unauthorized',
    NOT_FOUND: 'Not found',
    INTERNAL_SERVER_ERROR: 'Internal server error',
}

export const ERROR_MAP = {
    'duplicate key value violates unique constraint "profiles_username_key"': 'Username already exists',
} as any