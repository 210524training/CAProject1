import dynamo from '../dynamo/dynamo';
import User from '../models/user';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import log from '../log';

export class UserDAO {
  private client: DocumentClient;

  constructor() {
    this.client = dynamo;
   }

  async updateUser(user: User): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'Users',
      Key: {
        username: user.username,
      },
      ReturnConsumedCapacity: 'TOTAL',
      UpdateExpression: 'SET #password = :pw, #userClass = :uc, #department = :dp, #email = :em, #name = :nm, #supervisor = :sp, #yearReimbursement = :yr',
      ExpressionAttributeNames: {
        '#password': 'password',
        '#userClass': 'userClass',
        '#department': 'department',
        '#email': 'email',
        '#name': 'name',
        '#supervisor': 'supervisor',
        '#yearReimbursement': 'yearReimbursement',
      },
      ExpressionAttributeValues: {
        ':pw': user.password,
        ':uc': user.userClass,
        ':dp': user.department,
        ':em': user.email,
        ':nm': user.name,
        ':sp': user.supervisor,
        ':yr': user.yearReimbursement,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      const result = await this.client.update(params).promise();

      log.debug(result);
      return true;
    } catch (error) {
      return false;
    }
  }

  async register(user:User): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'Users',
      Item: user,
      ReturnConsumedCapacity: 'TOTAL',
      ConditionExpression: 'username <> :username',
      ExpressionAttributeValues: {
        ':username': user.username,
      },
    };

    try {
      const result = await this.client.put(params).promise();

      log.debug(result);
      return true;
    } catch(error) {
      return false;
    }
  }

  async getByUsername(username: string): Promise<User | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'Users',
      Key: {
        username,
      },
      ProjectionExpression: '#un, #pw, #uc, #dp, #em, #nm, #sp, #yr',
      ExpressionAttributeNames: {
        '#un': 'username',
        '#pw': 'password',
        '#uc': 'userClass',
        '#dp': 'department',
        '#em': 'email',
        '#nm': 'name',
        '#sp': 'supervisor',
        '#yr': 'yearReimbursement',
      },
    };

    const data = await this.client.get(params).promise();

    return data.Item as User | undefined;
  }

  async getUserByDepartment(department:string): Promise<User[]> {
    const params: DocumentClient.ScanInput= {
      TableName: 'Users',
      ProjectionExpression: '#un, #pw, #uc, #dp, #em, #nm, #sp, #yr',
      FilterExpression: "#dp = :department",
      ExpressionAttributeNames: {
        '#un': 'username',
        '#pw': 'password',
        '#uc': 'userClass',
        '#dp': 'department',
        '#em': 'email',
        '#nm': 'name',
        '#sp': 'supervisor',
        '#yr': 'yearReimbursement',
      },
      ExpressionAttributeValues: {
        ":department" : department,
      },
    };

    const data = await this.client.scan(params).promise();

    if(data.Items) {
      return data.Items as User[];
    }

    return [];
  }

  async getUserBySupervisor(supervisor:string): Promise<User[]> {
    const params: DocumentClient.ScanInput= {
      TableName: 'Users',
      ProjectionExpression: '#un, #pw, #uc, #dp, #em, #nm, #sp, #yr',
      FilterExpression: "#sp = :supervisor",
      ExpressionAttributeNames: {
        '#un': 'username',
        '#pw': 'password',
        '#uc': 'userClass',
        '#dp': 'department',
        '#em': 'email',
        '#nm': 'name',
        '#sp': 'supervisor',
        '#yr': 'yearReimbursement',
      },
      ExpressionAttributeValues: {
        ":supervisor" : supervisor,
      },
    };

    const data = await this.client.scan(params).promise();

    if(data.Items) {
      return data.Items as User[];
    }

    return [];
  }
}

const userDAO = new UserDAO();

export default userDAO;
