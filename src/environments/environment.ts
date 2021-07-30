// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:4200/registry/api/v1',
  // baseUrl: 'https://ndear.xiv.in/registry/api/v1',
  schemaUrl: 'http://localhost:4200/registry/api/docs/swagger.json'
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

