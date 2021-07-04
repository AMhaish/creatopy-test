class Constants {
    static AccessLevels = {
        Anonymous: "Anonymous",
        Authenticated: "Authenticated",
    };

    static HttpMethods = {
        GET: "GET",
        HEAD: "HEAD",
        POST: "POST",
        PUT: "PUT",
        PATCH: "PATCH",
        DELETE: "DELETE",
        OPTIONS: "OPTIONS",
        TRACE: "TRACE"
    };

    static AllowedOrigins = [
        "http://localhost",
        "http://localhost:3000",
    ];

    static UploadLimit = "20mb";

    static StatusCodes = {
        Success: 200,
        SuccessAndContinue: 204,
        NotRegistered: 401,
        EmailExist: 403,
        GeneralError: 400,
        UnauthorizedAceess: 401,
        EntityExistException: 403,
        NotFound: 404,
        NotConfirmed: 403,
        ForbiddenError: 403,
        ServiceUnavailable: 503, // If database ... etc is unavailable
    };

    static RequestsLevels = {
        Anonymous: "Anonymous",
        Authenticated: "Authenticated",
    };
}

export default Constants;