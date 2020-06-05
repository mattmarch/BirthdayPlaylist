import React, { FunctionComponent } from "react";
import styled from "styled-components";

const MainLayout: FunctionComponent = (props) => (
  <PaddedCenteredContainer>
    <h1>Birthday Playlist Generator</h1>
    <p>
      Generate a Spotify playlist of UK number ones on your Birthday since you
      were born. This site is a work in progress.
    </p>
    {props.children}
  </PaddedCenteredContainer>
);

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PaddedCenteredContainer = styled(CenteredContainer)`
  padding: 20px;
`;

export default MainLayout;
