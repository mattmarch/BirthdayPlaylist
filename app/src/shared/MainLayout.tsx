import React, { FunctionComponent } from "react";
import styled from "styled-components";

const MainLayout: FunctionComponent = (props) => (
  <PaddedCenteredContainer>
    <h1>Birthday Playlist Generator</h1>
    <p>
      Generate a Spotify playlist of UK number ones on your Birthday since you
      were born.
    </p>
    <p>
      Historical data is consistent with{" "}
      <a href="https://en.wikipedia.org/wiki/Lists_of_UK_Singles_Chart_number_ones">
        this Wikipedia page
      </a>{" "}
      (as of 9th June 2020), and new entries will be updated on day of chart
      release.
    </p>
    <MainContent>{props.children}</MainContent>
    <Footer />
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

const MainContent = styled(CenteredContainer)`
  flex-grow: 1;
`;

const FooterContainer = styled.div`
  text-align: center;
  width: 80%;
`;

const Footer = () => (
  <FooterContainer>
    <hr />
    <p>
      © 2020 <a href="https://mattmarch.co.uk">Matt March</a>
    </p>
    <p>
      Check out this project on{" "}
      <a href="https://github.com/mattmarch/BirthdayPlaylist">Github</a>
    </p>
  </FooterContainer>
);

export default MainLayout;
