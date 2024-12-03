export const createUserValidationSchema = {
    username: {
        isLength: {
            options:{
                min:5, 
                max: 32,
            },
            errorMessage: 'username must be 5-32 char',
        },
        notEmpty: {
            errorMessage: 'must not be empty',

        },
        isString: {
            errorMessage: 'Username must be a string',
        } 

    },
    displayName: {
        notEmpty:{
            errorMessage: 'displayname must be a string',
        }
    }
}