const initialState = {
    alertMsg: '',
    alertMsgSuccess: '',
    isErrorReport: false,
    isLoadingReport: false,
    isReport: false,
    dataReport: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REPORT_GET_PENDING': {
            return {
                ...state,
                isErrorReport:false,
                isLoadingReport:true,
                isReport:false,
            };
        }
        case 'REPORT_GET_REJECTED': {
            return {
                ...state,
                isErrorReport:true,
                isLoadingReport:false,
                isReport:false,
            };
        }
        case 'REPORT_GET_FULFILLED': {
            return {
                ...state,
                isErrorReport:false,
                isLoadingReport:false,
                isReport:true,
                dataReport:action.payload.data.data,
            };
        }
        case 'CLEAR_REPORT': {
            return {
                ...state,
                isErrorReport: false,
                isLoadingReport: false,
                isReport: false,
                dataReport: [],
            };
        }
        default: {
            return state;
        }
    }
};
