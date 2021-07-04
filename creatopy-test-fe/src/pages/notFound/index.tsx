import React from "react";
import { Button } from "@material-ui/core";

const PageNotFound: React.FC = () => {
  return (
    <div>
      <h1 className="translate">404 Not Found</h1>
      <hr />
      <Button size="large" color="secondary" href="/logout">Logout</Button>
    </div>
  );
}

export default PageNotFound;