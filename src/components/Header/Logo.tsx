import { Image } from '@chakra-ui/react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" passHref>
      <Image
        src={'/assets/images/logo3.png'}
        alt="Logomarca da Romaria Fluvial"
        width={['100px', '200%', '250px']}
        minWidth="100px"
        minHeight="23px"
        cursor="pointer"
      />
    </Link>
  );
}
