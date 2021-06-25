import Application, { approval } from '../models/application';
import applicationDAO, { ApplicationDAO } from '../repositories/application.repository';

export class ApplicationService {
  private dao: ApplicationDAO;

  constructor() {
    this.dao = applicationDAO;
  }

  getAll(): Promise<Application[]> {
    return this.dao.getAll();
  }

  getById(id: string): Promise<Application | null> {
    return this.dao.getById(id);
  }

  add(application: Application): Promise<boolean> {
    return this.dao.add(application);
  }

  update(application: Application): Promise<boolean> {
    return this.dao.update(application);
  }

  delete(id: string): Promise<boolean> {
    return this.dao.delete(id);
  }

  getByUsername(username:string): Promise<Application[]> {
    return this.dao.getByUsername(username);
  }

  getBySupervisorApproval(supervisorApproval:approval): Promise<Application[]> {
    return this.dao.getBySupervisorApproval(supervisorApproval);
  }

  getByBenCoApproval(benCoApproval:approval): Promise<Application[]> {
    return this.dao.getByBenCoApproval(benCoApproval);
  }

  getByHeadApproval(headApproval:approval): Promise<Application[]> {
    return this.dao.getByHeadApproval(headApproval);
  }

  getByGradeApproval(gradeApproval:approval): Promise<Application[]> {
    return this.dao.getByGradeApproval(gradeApproval);
  }
}

const applicationService = new ApplicationService();

export default applicationService;
