const data = [
    {
        col: "col1",
        type: "=",
        value: "1",
        cond: "and"
    },
    {
        col: "col1",
        type: "=",
        value: "1",
        cond: "or"
    },
    {
        col: "col1",
        type: "=",
        value: "1",
        cond: "and",

    },
    {
        cond: "and",
        nested: [{
            col: "col1",
            type: "=",
            value: "1",
            cond: "or"
        },
        {
            col: "col1",
            type: "=",
            value: "1",
            cond: "or",

        },]
    }
]

const makeQuery = (data, prefix = false) => {
    if (Array.isArray(data.nested) && data.nested.length > 0) {
        return `${prefix ? data.cond : ""} (${data.nested.map((i, ind) => makeQuery(i, ind !== 0)).join(" ")})`.trim()
    }

    return `${prefix ? data.cond : ""} ${data.col} ${data.type} ${data.value}`.trim()
}

const query = `${data.map((i, ind) => makeQuery(i, ind !== 0)).join(" ")}`

console.log(query)