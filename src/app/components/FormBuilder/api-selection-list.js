export const apiselectlist = [
    {
        name: "Branches",
        url: "https://globalconnect.gibl.com.np/api/dbBranches",
        method: "get",
        payload: [],
        responseType: "array",
        responseKey: "response.data",
        response: {
            status: "string",
            message: "string",
            data: [
                {
                    key: 'id',
                    type: "integer",
                },
                {
                    key: 'name',
                    type: "string",
                },
                {
                    key: 'sol',
                    type: "string",
                },
                {
                    key: 'lc_decentralized',
                    type: "boolen",
                },
                {
                    key: 'bg_decentralized',
                    type: "boolen",
                },
                {
                    key: 'bg_type',
                    type: "string",
                },
                {
                    key: 'isDeleted',
                    type: "boolen",
                },
                {
                    key: 'createdAt',
                    type: "datetime",
                },
                {
                    key: 'updatedAt',
                    type: "datetime",
                },
            ],
        },
        header: "",
        auth_type: "",
        token: "",
    },
    {
        name: "Province",
        url: "http://localhost:8181/api/get-province-api",
        method: "get",
        payload: [],
        responseType: "array",
        responseKey: "response.data",
        response: {
            status: "string",
            message: "string",
            data: [
                {
                    key: 'province',
                    type: "string",
                },
                {
                    key: 'number',
                    type: "integer",
                }]
        },
        header: "",
        auth_type: "",
        token: "",
    },
    {
        name: "District",
        url: "http://localhost:8181/api/get-district-api",
        method: "get",
        payload: [{
            type: "integer",
            name: "province_id"
        }],
        responseType: "array",
        responseKey: "response.data",
        response: {
            status: "string",
            message: "string",
            data: [
                {
                    key: 'district_name',
                    type: "string",
                },
                {
                    key: 'province_id',
                    type: "integer",
                }]
        },
        header: "",
        auth_type: "",
        token: "",
    },
    {
        name: "Account Details",
        url: "http://localhost:8181/api/accountnumber-api",
        method: "get",
        payload: [{
            type: "integer",
            name: "accountnumber"
        },
        {
            type: "string",
            name: "accountname"
        },
        {
            type: "string",
            name: "phonenumber"
        },
        {
            type: "string",
            name: "email"
        }],
        responseType: "object",
        responseKey: "response",
        response: [{
            type: "integer",
            key: "accountnumber"
        },
        {
            type: "string",
            key: "accountname"
        },
        {
            type: "string",
            key: "phonenumber"
        },
        {
            type: "string",
            key: "email"
        }],
        header: "",
        auth_type: "",
        token: "",
    },
    {
        name: "GeoLocation",
        url: "https://ipapi.co/json/",
        method: "get",
        payload: [],
        responseType: "object",
        responseKey: "response",
        response: [
            {
                key: 'ip',
                type: "string",
            },
            {
                key: 'network',
                type: "string",
            },
            {
                key: 'version',
                type: "string",
            },
            {
                key: 'city',
                type: "string",
            },
            {
                key: 'region',
                type: "string",
            },
            {
                key: 'region_code',
                type: "string",
            },
            {
                key: 'country',
                type: "string",
            },
            {
                key: 'country_name',
                type: "string",
            },
            {
                key: 'country_code',
                type: "string",
            },
            {
                key: 'country_code_iso3',
                type: "string",
            },
            {
                key: 'country_capital',
                type: "string",
            },
            {
                key: 'country_tld',
                type: "string",
            },
            {
                key: 'continent_code',
                type: "string",
            },
            {
                key: 'in_eu',
                type: "boolean",
            },
            {
                key: 'postal',
                type: "string",
            },
            {
                key: 'latitude',
                type: "float",
            },
            {
                key: 'longitude',
                type: "float",
            },
            {
                key: 'timezone',
                type: "string",
            },
            {
                key: 'utc_offset',
                type: "string",
            },
            {
                key: 'country_calling_code',
                type: "string",
            },
            {
                key: 'currency',
                type: "string",
            },
            {
                key: 'currency_name',
                type: "string",
            },
            {
                key: 'languages',
                type: "string",
            },
            {
                key: 'country_area',
                type: "float",
            },
            {
                key: 'country_population',
                type: "integer",
            },
            {
                key: 'asn',
                type: "string",
            },
            {
                key: 'org',
                type: "string",
            },
        ],
        header: "",
        auth_type: "",
        token: "",
    }


];
