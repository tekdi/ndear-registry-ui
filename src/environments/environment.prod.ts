export const environment = {
  production: true,
  baseUrl: 'http://20.198.64.128/registry/api/v1',
  schemaUrl: 'http://20.198.64.128/registry/api/docs/swagger.json'
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