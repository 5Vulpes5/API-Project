"use strict";
const AWS = require("aws-sdk");

const updateItem = async (event) => {

    const { itemStatus } = new JSON.parse(event.body);
    const { id } = event.pathParameters

    const dynamoDB = new AWS.dynamoDB.DocumentClient();

    await dynamoDB.update({
        TableName: "ItemTableNew",
        Key: { id }
        UpdateExpression: 'set itemStatus = :itemStatus',
        ExpressionAttributeValues: {
            ':itemStatus': itemStatus
        },
        ReturnValues: "ALL_NEW"
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(
            { msg: 'Item Updated' }
        ),
    };
};

module.exports = {
    handler: updateItem
}