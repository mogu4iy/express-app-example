class Error400 extends Error {
    constructor(message) {
        super(message)
        this.status = 400
    }
}

class Error401 extends Error {
    constructor(message) {
        super(message)
        this.status = 401
    }
}

class Error403 extends Error {
    constructor(message) {
        super(message)
        this.status = 403
    }
}

class Error404 extends Error {
    constructor(message) {
        super(message)
        this.status = 404
    }
}

class Error500 extends Error {
    constructor(message) {
        super(message)
        this.status = 500
    }
}

const handleError = ({error, res}) => {
    console.log(error)
    return error.status ? (
        res.status(200).json({
            success: false,
            data: {},
            message: error.message,
        })
    ) : (
        process.env.NODE_ENV === 'production' ? (
            res.status(200).json({
                success: false,
                data: {},
                message: `Server error`,
            })
        ) : (
            res.status(200).json({
                success: false,
                data: {},
                message: `Server error: ${error}`,
            })
        )
    )
}

const handlerWrapper = ({dataFunction, promiseHandler}) => {
    return async (req, res, next) => {
        return await promiseHandler(req, res, next, dataFunction(req))
            .catch(error => {
                return handleError({
                    error: error,
                    res: res
                })
            })
    }
}

const errorMessages = {
    USER_EXIST: 'USER_EXIST_MESSAGE',
    USER_NOT_EXIST: 'USER_NOT_EXIST_MESSAGE',
    AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
    AUTH_TOKEN_DEPRECATED: 'AUTH_TOKEN_DEPRECATED',
    TOKEN_INVALID: 'TOKEN_INVALID',
    TOKEN_DEPRECATED: 'TOKEN_DEPRECATED',
    USER_NOT_VERIFIED: 'USER_NOT_VERIFIED',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    MFA_ENABLED: 'MFA_ENABLED',
    MFA_DISABLED: 'MFA_DISABLED',
    NOT_ENOUGH_DATA_FOR_MFA: 'NOT_ENOUGH_DATA_FOR_MFA',
    EMAIL_VERIFIED: 'EMAIL_VERIFIED',
    EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
    PHONE_VERIFIED: 'PHONE_VERIFIED',
    PHONE_NOT_VERIFIED: 'PHONE_NOT_VERIFIED',
    PHONE_NOT_EXIST: 'PHONE_NOT_EXIST',
    EMAIL_NOT_EXIST: 'EMAIL_NOT_EXIST',
    MFA_TYPE_NOT_AVAILABLE: 'MFA_TYPE_NOT_AVAILABLE',
    TRY_LATER: "TRY_LATER",
    SYMBOL_NOT_EXIST: "SYMBOL_NOT_EXIST",
    WALLET_BLOCKED: "WALLET_BLOCKED",
    WALLET_DISABLED: "WALLET_DISABLED",
    WRONG_ORDER_TYPE: "WRONG_ORDER_TYPE",
    PAYMENT_METHOD_EXIST_ALREADY: "PAYMENT_METHOD_EXIST_ALREADY",
    PAYMENT_METHOD_NOT_EXIST: "PAYMENT_METHOD_NOT_EXIST",
    WRONG_SESSION_START_TYPE: "WRONG_SESSION_START_TYPE",
    COMPANY_NOT_EXIST: "COMPANY_NOT_EXIST",
    WRONG_AMOUNT: "WRONG_AMOUNT",
    WRONG_WALLET: "WRONG_WALLET",
    WRONG_SESSION: "WRONG_SESSION"
}

module.exports = {
    Error400,
    Error401,
    Error403,
    Error404,
    Error500,
    errorMessages,
    handlerWrapper,
    handleError
}