import { LinkProps, Link as ReactRouterLink } from 'react-router-dom';
import { Box, BoxProps } from 'theme-ui';

type PropsT = BoxProps & LinkProps;
const Link = (props: PropsT) => <Box {...props} as={ReactRouterLink} />;

export default Link;
