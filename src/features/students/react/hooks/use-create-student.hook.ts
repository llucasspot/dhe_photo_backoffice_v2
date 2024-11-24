import { useMutation, useQueryClient } from '@tanstack/react-query';

import { studentsKeys } from './use-students.hook';

import { useService } from '#di/react';
import { projectsKeys } from '#features/projects/react';
import {
  CreateStudentBody,
  StudentsServicePort,
} from '#features/students/domain';
import { ToastService } from '#toast/domain';

export const useCreateStudent = (projectId: string) => {
  const queryClient = useQueryClient();
  const studentsService = useService(StudentsServicePort);
  const toastService = useService(ToastService);

  return useMutation({
    mutationFn: async (data: CreateStudentBody) => {
      return toastService.promise(() => studentsService.createStudent(data), {
        pending: 'students.create.pending',
        success: 'students.create.success',
        error: 'students.create.error',
      });
    },
    onSuccess: (student) => {
      queryClient.invalidateQueries({
        queryKey: studentsKeys.list(student.klassId),
      });
      queryClient.invalidateQueries({
        queryKey: projectsKeys.detail(projectId),
      });
    },
    onError: (error) => {
      console.error('Failed to create student:', error);
    },
  });
};
