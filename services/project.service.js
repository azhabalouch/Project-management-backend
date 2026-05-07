const AppError = require('../utils/AppError');

class ProjectService {
  constructor(db) {
    this.db = db; // Injected dependency
  }

  async createProject(userId, projectData) {
    const projectsRef = this.db.collection('users').doc(userId).collection('projects');
    
    const newProject = {
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await projectsRef.add(newProject);
    return { id: docRef.id, ...newProject };
  }

  async getProjectById(userId, projectId) {
    const projectRef = this.db.collection('users').doc(userId).collection('projects').doc(projectId);
    
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      throw new AppError('Project not found', 404);
    }

    return { id: projectDoc.id, ...projectDoc.data() };
  }

  async getAllProjects(userId) {
    const projectsRef = this.db.collection('users').doc(userId).collection('projects');
    
    const snapshot = await projectsRef.get();
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return projects;
  }

  async updateProject(userId, projectId, updateData) {
    const projectRef = this.db.collection('users').doc(userId).collection('projects').doc(projectId);
    
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      throw new AppError('Project not found', 404);
    }

    const updated = { ...updateData, updatedAt: new Date().toISOString() };
    await projectRef.update(updated);
    
    return { id: projectId, ...projectDoc.data(), ...updated };
  }

  async deleteProject(userId, projectId) {
    const projectRef = this.db.collection('users').doc(userId).collection('projects').doc(projectId);
    
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      throw new AppError('Project not found', 404);
    }

    await projectRef.delete();
    return { id: projectId };
  }
}

module.exports = ProjectService;
