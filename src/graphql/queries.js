export const userByEmail = `query User($email: String!) {
    userByEmail(email: $email) {
      id
      email
      role
      company {
          name
          address
          id
      }
    }
  }
  `;

export const student = `query Student($id: Int!)
{
    studentByID(id: $id){
        id
        name
        phone
        user {
          email
        }
    }
}`;

export const students = `query Students($companyid: Int!)
{
    studentsByCompany(companyid: $companyid){
        id
        name
        phone
        user{
          email
        }
    }
}`;

export const tutor = `query Tutor($id: Int!)
{
    tutorByID(id: $id){
        id
        name
        phone
        user{
          email
        }
    }
}`;
export const tutors = `query Tutors($companyid: Int!)
{
    tutorsByCompany(companyid: $companyid){
        id
        name
        phone
        user{
          email
        }
    }
}`;

export const productsByStudent = `query productsByStudent($userid: Int!)
{
    productsByStudent(userid: $userid){
      id
      rate
      tutorshare
      subject
      active
      student{
        id
        name
      }
      tutor {
        id
        name
      }
  }
}`;

export const productsByTutor = `query productsByTutor($userid: Int!)
{
    productsByTutor(userid: $userid){
      id
      rate
      tutorshare
      subject
      active
      student{
        id
        name
      }
      tutor {
        id
        name
      }
  }
}`;

export const products = `query Products($companyid: Int!)
{
    productsByCompany(companyid: $companyid){
        id
        rate
        tutorshare
        subject
        active
        student{
          id
          name
        }
        tutor {
          id
          name
        }
    }
}`;

export const sessions = `query Sessions($companyid: Int!)
{
    sessionsByCompany(companyid: $companyid){
      id
      date
      length
      location
      studentconfirmed
      tutorconfirmed
      product{
        subject
        student{
          name
        }
        tutor {
          name
        }
      }
    }
}`;


export const sessionsByTutor = `query SessionsByTutor($userid: Int!)
{
    sessionsByTutor(userid: $userid){
      id
      date
      length
      location
      studentconfirmed
      tutorconfirmed
      product{
        subject
        student{
          name
        }
        tutor {
          name
        }
      }
    }
}`;

export const sessionsByStudent = `query SessionsByStudent($userid: Int!)
{
    sessionsByStudent(userid: $userid){
      id
      date
      length
      location
      studentconfirmed
      tutorconfirmed
      product{
        subject
        student{
          name
        }
        tutor {
          name
        }
      }
    }
}`;