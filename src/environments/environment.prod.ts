export const environment = {
  production: true,
  baseUrl: 'https://ndear.xiv.in/registry/api/v1',
  schemaUrl: 'https://ndear.xiv.in/registry/api/docs/swagger.json'
};

export enum ApiPaths {
  Institute = 'Institute',
  Teacher = 'Teacher',
  Student = 'Student',
  InviteStudent = 'Student/invite',
  InviteTeacher = 'Teacher/invite',
  InviteInstitute = 'Institute/invite',
  searchInstitute = 'Institute/search',
  searchTeacher = 'Teacher/search',
  searchStudent = 'Student/search',
  //teacherGrantDenyClaims = 'Teacher/claims',
  //studentGrantDenyClaims = 'Student/claims',
  //instituteGrantDenyClaims = 'Institute/claims',
  allClaims = ''
}