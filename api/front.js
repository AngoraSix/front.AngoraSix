class FrontAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async setProfileAttributes(attributes) {
    const { data } = await this.axios.post(`api/profile`, attributes);
    return data;
  }

  async uploadFile(file) {
    const formData = new FormData();
    file = Array.isArray(file) ? file[0] : file;
    formData.append('file', file);
    const { data } = await this.axios.post(`api/upload/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const images = data.urls;
    const thumbnails = data.thumbnails;

    return images.length && thumbnails.length
      ? [images[0], thumbnails[0]]
      : null;
  }

  async uploadFiles(files) {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((f) => formData.append('file[]', f));
    } else {
      formData.append('file', files);
    }
    const { data } = await this.axios.post(`api/upload/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  async saveProject(projectBody, projectId) {
    const { data } = projectId
      ? await this.axios.put(`api/projects/${projectId}`, projectBody)
      : await this.axios.post(`api/projects`, projectBody);
    return data;
  }

  async saveProjectPresentation(
    projectPresentationBody,
    projectPresentationId,
    projectId
  ) {
    const { data } = projectPresentationId
      ? await this.axios.put(
          `api/projects/${projectId}/presentations/${projectPresentationId}`,
          projectPresentationBody
        )
      : await this.axios.post(
          `api/projects/${projectId}/presentations`,
          projectPresentationBody
        );
    return data;
  }

  async modifyClubMembership(projectId, clubType, operation, data) {
    const { data: modifyClubMembershipResult } = await this.axios.post(
      `api/clubs/well-known/members`,
      {
        projectId,
        clubType,
        operation,
        data,
      }
    );
    return modifyClubMembershipResult;
  }

  async getClub(projectId, clubType) {
    const { data } = await this.axios.get(
      `api/clubs/well-known/${projectId}/${clubType}`
    );
    return data;
  }

  async getAdministeredProjectsClubs(contributorId) {
    const { data } = await this.axios.get(`api/clubs/well-known`, {
      params: { adminId: contributorId },
    });
    return data;
  }

  async getAdministeredProjects(contributorId) {
    const { data } = await this.axios.get(`api/projects`, {
      params: { adminId: contributorId },
    });
    return data;
  }

  async getContributors(contributorIds) {
    const contributorIdsArray = Array.isArray(contributorIds)
      ? contributorIds
      : [contributorIds];
    const { data: membersData } = await this.axios.get(`/api/contributors`, {
      params: { contributorIds: contributorIdsArray.join() },
    });
    return membersData;
  }
}

export default FrontAPI;
