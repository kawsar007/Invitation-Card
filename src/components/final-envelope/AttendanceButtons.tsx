import { AttendanceStatus } from '@/types/types';
import React from 'react';

interface AttendanceButtonsProps {
  attendanceStatus: AttendanceStatus;
  onAttendanceChange: (status: AttendanceStatus) => void;
}

export const AttendanceButtons: React.FC<AttendanceButtonsProps> = ({
  attendanceStatus,
  onAttendanceChange
}) => {
  return (
    <div className="flex gap-3 mb-4">
      <button
        onClick={() => onAttendanceChange('ATTEND')}
        className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${attendanceStatus === 'ATTEND'
          ? 'bg-green-500 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        Will Attend
      </button>
      <button
        onClick={() => onAttendanceChange('NOT_ATTEND')}
        className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${attendanceStatus === 'NOT_ATTEND'
          ? 'bg-gray-500 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        Will Not Attend
      </button>
    </div>
  );
};