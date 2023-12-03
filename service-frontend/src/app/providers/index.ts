import { observer } from 'mobx-react-lite';
import { compose } from 'shared/helpers';
import withRouter from './with-router';

export const withProviders = compose(observer, withRouter);
