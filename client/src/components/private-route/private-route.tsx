import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { ReactNode } from 'react';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: ReactNode;
};

function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps) {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    <>{children}</>
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export { PrivateRoute };
