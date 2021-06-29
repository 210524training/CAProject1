import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import Application, { approval } from '../models/application';

export class ApplicationDAO {
  private client: DocumentClient;

  constructor() {
    this.client = dynamo;
  }

  async getAll(): Promise<Application[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'Applications',
      ProjectionExpression: '#un, #nm, #em, #id, #sa, #bca, #ha, #cn, #ct, #am, #aam, #ad, #cd, #cl, #gt, #ga, #gd, #ju, #cds, #ur, #sap, #pd, #mwd, #ste, #ets, #hte, #eth, #hts, #sth, #bte, #etb, #bts, #stb, #bth, #htb',
      ExpressionAttributeNames: {
        '#un': 'username',
        '#nm': 'name',
        '#em': 'email',
        '#id': 'id',
        '#sa': 'supervisorApproval',
        '#bca': 'benCoApproval',
        '#ha': 'headApproval',
        '#cn': 'courseName',
        '#ct': 'courseType',
        '#am': 'amount',
        '#aam': 'adjustedAmount',
        '#ad': 'appDate',
        '#cd': 'courseDate',
        '#cl': 'courseLocation',
        '#gt': 'gradeType',
        '#ga': 'gradeApproval',
        '#gd': 'gradeDescription',
        '#ju': 'justification',
        '#cds': 'courseDescription',
        '#ur': 'urgent',
        '#sap': 'specialApproval',
        '#pd': 'preapprovalDescription',
        '#mwd': 'missedWorkDesc',
        '#ste': 'SToEm',
        '#ets': 'EmToS',
        '#hte': 'HToEm',
        '#eth': 'EmToH',
        '#hts': 'HToS',
        '#sth': 'SToH',
        '#bte': 'BCToEm',
        '#etb': 'EmToBC',
        '#bts': 'BCToS',
        '#stb': 'SToBC',
        '#bth': 'BCToH',
        '#htb': 'HToBC',
      },
    };

    const data = await this.client.scan(params).promise();

    if(data.Items) {
      return data.Items as Application[];
    }

    return [];
  }

  async getByUsername(username:string): Promise<Application[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'Applications',
      ProjectionExpression: '#un, #nm, #em, #id, #sa, #bca, #ha, #cn, #ct, #am, #aam, #ad, #cd, #cl, #gt, #ga, #gd, #ju, #cds, #ur, #sap, #pd, #mwd, #ste, #ets, #hte, #eth, #hts, #sth, #bte, #etb, #bts, #stb, #bth, #htb',
      FilterExpression: '#un = :username',
      ExpressionAttributeNames: {
        '#un': 'username',
        '#nm': 'name',
        '#em': 'email',
        '#id': 'id',
        '#sa': 'supervisorApproval',
        '#bca': 'benCoApproval',
        '#ha': 'headApproval',
        '#cn': 'courseName',
        '#ct': 'courseType',
        '#am': 'amount',
        '#aam': 'adjustedAmount',
        '#ad': 'appDate',
        '#cd': 'courseDate',
        '#cl': 'courseLocation',
        '#gt': 'gradeType',
        '#ga': 'gradeApproval',
        '#gd': 'gradeDescription',
        '#ju': 'justification',
        '#cds': 'courseDescription',
        '#ur': 'urgent',
        '#sap': 'specialApproval',
        '#pd': 'preapprovalDescription',
        '#mwd': 'missedWorkDesc',
        '#ste': 'SToEm',
        '#ets': 'EmToS',
        '#hte': 'HToEm',
        '#eth': 'EmToH',
        '#hts': 'HToS',
        '#sth': 'SToH',
        '#bte': 'BCToEm',
        '#etb': 'EmToBC',
        '#bts': 'BCToS',
        '#stb': 'SToBC',
        '#bth': 'BCToH',
        '#htb': 'HToBC',
      },
      ExpressionAttributeValues: {
        ":username" : username,
      },
    };

    const data = await this.client.scan(params).promise();

    if(data.Items) {
      return data.Items as Application[];
    }

    else{return []};
  }

  async getBySupervisorApproval(supervisorApproval:approval): Promise<Application[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'Applications',
      ProjectionExpression: '#un, #nm, #em, #id, #sa, #bca, #ha, #cn, #ct, #am, #aam, #ad, #cd, #cl, #gt, #ga, #gd, #ju, #cds, #ur, #sap, #pd, #mwd, #ste, #ets, #hte, #eth, #hts, #sth, #bte, #etb, #bts, #stb, #bth, #htb',
      FilterExpression: '#sa = :supervisorApproval',
      ExpressionAttributeNames: {
        '#un': 'username',
        '#nm': 'name',
        '#em': 'email',
        '#id': 'id',
        '#sa': 'supervisorApproval',
        '#bca': 'benCoApproval',
        '#ha': 'headApproval',
        '#cn': 'courseName',
        '#ct': 'courseType',
        '#am': 'amount',
        '#aam': 'adjustedAmount',
        '#ad': 'appDate',
        '#cd': 'courseDate',
        '#cl': 'courseLocation',
        '#gt': 'gradeType',
        '#ga': 'gradeApproval',
        '#gd': 'gradeDescription',
        '#ju': 'justification',
        '#cds': 'courseDescription',
        '#ur': 'urgent',
        '#sap': 'specialApproval',
        '#pd': 'preapprovalDescription',
        '#mwd': 'missedWorkDesc',
        '#ste': 'SToEm',
        '#ets': 'EmToS',
        '#hte': 'HToEm',
        '#eth': 'EmToH',
        '#hts': 'HToS',
        '#sth': 'SToH',
        '#bte': 'BCToEm',
        '#etb': 'EmToBC',
        '#bts': 'BCToS',
        '#stb': 'SToBC',
        '#bth': 'BCToH',
        '#htb': 'HToBC',
      },
      ExpressionAttributeValues: {
        ":supervisorApproval" : supervisorApproval,
      },
    };

    const data = await this.client.scan(params).promise();

    if(data.Items) {
      return data.Items as Application[];
    }

    return [];
  }

  async getByBenCoApproval(benCoApproval:approval): Promise<Application[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'Applications',
      ProjectionExpression: '#un, #nm, #em, #id, #sa, #bca, #ha, #cn, #ct, #am, #aam, #ad, #cd, #cl, #gt, #ga, #gd, #ju, #cds, #ur, #sap, #pd, #mwd, #ste, #ets, #hte, #eth, #hts, #sth, #bte, #etb, #bts, #stb, #bth, #htb',
      FilterExpression: '#bca = :benCoApproval',
      ExpressionAttributeNames: {
        '#un': 'username',
        '#nm': 'name',
        '#em': 'email',
        '#id': 'id',
        '#sa': 'supervisorApproval',
        '#bca': 'benCoApproval',
        '#ha': 'headApproval',
        '#cn': 'courseName',
        '#ct': 'courseType',
        '#am': 'amount',
        '#aam': 'adjustedAmount',
        '#ad': 'appDate',
        '#cd': 'courseDate',
        '#cl': 'courseLocation',
        '#gt': 'gradeType',
        '#ga': 'gradeApproval',
        '#gd': 'gradeDescription',
        '#ju': 'justification',
        '#cds': 'courseDescription',
        '#ur': 'urgent',
        '#sap': 'specialApproval',
        '#pd': 'preapprovalDescription',
        '#mwd': 'missedWorkDesc',
        '#ste': 'SToEm',
        '#ets': 'EmToS',
        '#hte': 'HToEm',
        '#eth': 'EmToH',
        '#hts': 'HToS',
        '#sth': 'SToH',
        '#bte': 'BCToEm',
        '#etb': 'EmToBC',
        '#bts': 'BCToS',
        '#stb': 'SToBC',
        '#bth': 'BCToH',
        '#htb': 'HToBC',
      },
      ExpressionAttributeValues: {
        ":benCoApproval" : benCoApproval,
      },
    };

    const data = await this.client.scan(params).promise();

    if(data.Items) {
      return data.Items as Application[];
    }

    return [];
  }

  async getByHeadApproval(headApproval:approval): Promise<Application[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'Applications',
      ProjectionExpression: '#un, #nm, #em, #id, #sa, #bca, #ha, #cn, #ct, #am, #aam, #ad, #cd, #cl, #gt, #ga, #gd, #ju, #cds, #ur, #sap, #pd, #mwd, #ste, #ets, #hte, #eth, #hts, #sth, #bte, #etb, #bts, #stb, #bth, #htb',
      FilterExpression: '#ha = :headApproval',
      ExpressionAttributeNames: {
        '#un': 'username',
        '#nm': 'name',
        '#em': 'email',
        '#id': 'id',
        '#sa': 'supervisorApproval',
        '#bca': 'benCoApproval',
        '#ha': 'headApproval',
        '#cn': 'courseName',
        '#ct': 'courseType',
        '#am': 'amount',
        '#aam': 'adjustedAmount',
        '#ad': 'appDate',
        '#cd': 'courseDate',
        '#cl': 'courseLocation',
        '#gt': 'gradeType',
        '#ga': 'gradeApproval',
        '#gd': 'gradeDescription',
        '#ju': 'justification',
        '#cds': 'courseDescription',
        '#ur': 'urgent',
        '#sap': 'specialApproval',
        '#pd': 'preapprovalDescription',
        '#mwd': 'missedWorkDesc',
        '#ste': 'SToEm',
        '#ets': 'EmToS',
        '#hte': 'HToEm',
        '#eth': 'EmToH',
        '#hts': 'HToS',
        '#sth': 'SToH',
        '#bte': 'BCToEm',
        '#etb': 'EmToBC',
        '#bts': 'BCToS',
        '#stb': 'SToBC',
        '#bth': 'BCToH',
        '#htb': 'HToBC',
      },
      ExpressionAttributeValues: {
        ":headApproval" : headApproval,
      },
    };

    const data = await this.client.scan(params).promise();

    if(data.Items) {
      return data.Items as Application[];
    }

    return [];
  }

  async getByGradeApproval(gradeApproval:approval): Promise<Application[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'Applications',
      ProjectionExpression: '#un, #nm, #em, #id, #sa, #bca, #ha, #cn, #ct, #am, #aam, #ad, #cd, #cl, #gt, #ga, #gd, #ju, #cds, #ur, #sap, #pd, #mwd, #ste, #ets, #hte, #eth, #hts, #sth, #bte, #etb, #bts, #stb, #bth, #htb',
      FilterExpression: '#ga = :gradeApproval',
      ExpressionAttributeNames: {
        '#un': 'username',
        '#nm': 'name',
        '#em': 'email',
        '#id': 'id',
        '#sa': 'supervisorApproval',
        '#bca': 'benCoApproval',
        '#ha': 'headApproval',
        '#cn': 'courseName',
        '#ct': 'courseType',
        '#am': 'amount',
        '#aam': 'adjustedAmount',
        '#ad': 'appDate',
        '#cd': 'courseDate',
        '#cl': 'courseLocation',
        '#gt': 'gradeType',
        '#ga': 'gradeApproval',
        '#gd': 'gradeDescription',
        '#ju': 'justification',
        '#cds': 'courseDescription',
        '#ur': 'urgent',
        '#sap': 'specialApproval',
        '#pd': 'preapprovalDescription',
        '#mwd': 'missedWorkDesc',
        '#ste': 'SToEm',
        '#ets': 'EmToS',
        '#hte': 'HToEm',
        '#eth': 'EmToH',
        '#hts': 'HToS',
        '#sth': 'SToH',
        '#bte': 'BCToEm',
        '#etb': 'EmToBC',
        '#bts': 'BCToS',
        '#stb': 'SToBC',
        '#bth': 'BCToH',
        '#htb': 'HToBC',
      },
      ExpressionAttributeValues: {
        ":gradeApproval" : gradeApproval,
      },
    };

    const data = await this.client.scan(params).promise();

    if(data.Items) {
      return data.Items as Application[];
    }

    return [];
  }

  async getById(id: string): Promise<Application | null> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'Applications',
      Key: {
        id,
      },
      ProjectionExpression: '#un, #nm, #em, #id, #sa, #bca, #ha, #cn, #ct, #am, #aam, #ad, #cd, #cl, #gt, #ga, #gd, #ju, #cds, #ur, #sap, #pd, #mwd, #ste, #ets, #hte, #eth, #hts, #sth, #bte, #etb, #bts, #stb, #bth, #htb',
      ExpressionAttributeNames: {
        '#un': 'username',
        '#nm': 'name',
        '#em': 'email',
        '#id': 'id',
        '#sa': 'supervisorApproval',
        '#bca': 'benCoApproval',
        '#ha': 'headApproval',
        '#cn': 'courseName',
        '#ct': 'courseType',
        '#am': 'amount',
        '#aam': 'adjustedAmount',
        '#ad': 'appDate',
        '#cd': 'courseDate',
        '#cl': 'courseLocation',
        '#gt': 'gradeType',
        '#ga': 'gradeApproval',
        '#gd': 'gradeDescription',
        '#ju': 'justification',
        '#cds': 'courseDescription',
        '#ur': 'urgent',
        '#sap': 'specialApproval',
        '#pd': 'preapprovalDescription',
        '#mwd': 'missedWorkDesc',
        '#ste': 'SToEm',
        '#ets': 'EmToS',
        '#hte': 'HToEm',
        '#eth': 'EmToH',
        '#hts': 'HToS',
        '#sth': 'SToH',
        '#bte': 'BCToEm',
        '#etb': 'EmToBC',
        '#bts': 'BCToS',
        '#stb': 'SToBC',
        '#bth': 'BCToH',
        '#htb': 'HToBC',
      },
    };

    const data = await this.client.get(params).promise();

    if(!data.Item) {
      return null;
    }

    return data.Item as Application;
  }

  async add(application: Application): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'Applications',
      Item: application,     
      ConditionExpression: 'id <> :id',
      ExpressionAttributeValues: {
        ':id': application.id,
      },
    };
    try {
      await this.client.put(params).promise();

      return true;
    } catch(error) {
      console.log('Failed to add Application: ', error);
      return false;
    }
  }

  async update(application: Application): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'Applications',
      Item: {
        ...application,
      },
      ConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': application.id,
      },
    };

    try {
      await this.client.put(params).promise();

      return true;
    } catch(error) {
      console.log('Failed to update Application: ', error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'Applications',
      Key: {
        id: id,
      },
    };

    try {
      await this.client.delete(params).promise();

      return true;
    } catch(error) {
      console.log('Failed to delete Application: ', error);
      return false;
    }
  }
}

const applicationDAO = new ApplicationDAO();

export default applicationDAO;
