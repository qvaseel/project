import { User } from '@/interface';
import React from 'react';

interface Props {
  className?: string;
  profileUser: User;
}

export const Profile: React.FC<Props> = ({ className, profileUser }) => {
  return (
      <div className={className}>
        <p>Фамилия: {profileUser.lastName}</p>
        <p>Имя: {profileUser.firstName}</p>
        <p>Отчество: {profileUser.patronymic}</p>
        <p>{profileUser.role.description}</p>
        {profileUser.group ? (
            <p>{profileUser.group.name}</p>
        ):(<p></p>)
        }
      </div>
  );
};