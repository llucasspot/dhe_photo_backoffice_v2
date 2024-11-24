import { FilesMockDao } from './daos';
import { StudentsDaoPort } from './daos';

import { LogAction, MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';
import {
  CreateStudentBody,
  StudentDto,
  StudentsServicePort,
} from '#features/students/domain';

function generateUniqueCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

@singleton()
export class StudentsServiceMockAdapter
  extends MockAdapter
  implements StudentsServicePort
{
  constructor(
    @inject(StudentsDaoPort)
    private readonly studentsDao: StudentsDaoPort,
    @inject(FilesMockDao)
    private readonly filesDao: FilesMockDao,
  ) {
    super();
  }

  async getStudents(klassId: string): Promise<StudentDto[]> {
    await this.delay();
    const students = await this.studentsDao.getAll();
    return students.filter((student) => student.klassId === klassId);
  }

  async getStudent(id: string): Promise<StudentDto> {
    await this.delay();
    const student = await this.studentsDao.getById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  async createStudent(body: CreateStudentBody): Promise<StudentDto> {
    await this.delay();
    const uploadedFiles = await this.filesDao.saveMany(
      body.photos.map((photo) => ({ file: photo })),
    );
    return this.studentsDao.save({
      ...body,
      code: generateUniqueCode(),
      photoIds: uploadedFiles.map((file) => file.id),
    });
  }

  @LogAction()
  async createStudents(students: CreateStudentBody[]): Promise<StudentDto[]> {
    await this.delay();
    return Promise.all(students.map((student) => this.createStudent(student)));
  }

  async updateStudent(
    id: string,
    body: Partial<StudentDto>,
  ): Promise<StudentDto> {
    await this.delay();
    const student = await this.studentsDao.update(id, body);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  async deleteStudent(id: string): Promise<void> {
    await this.delay();
    const student = this.studentsDao.deleteById(id);
    if (!student) {
      throw new Error('Student not found');
    }
  }
}
