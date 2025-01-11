import { Link } from 'react-router-dom';
import { Image } from "@chakra-ui/react";
import './logo.module.scss';

function Logo() {
  return (
    <Link to="/">
      <Image src="logo.png" maxW={"15%"}/>
    </Link>
  );
}

export { Logo };
