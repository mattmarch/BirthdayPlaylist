import React from "react";
import styled from "styled-components";
import { PaddedCenteredContainer } from "./MainLayout";

const ShareLink = (props: { date: Date }) => {
  const url = `${window.location.origin}/#/${props.date.toISOString()}`;
  return (
    <PaddedCenteredContainer>
      <h4>Share this playlist:</h4>
      <LinkContainer>
        <LinkText>{url}</LinkText>
        <CopyButton onClick={() => navigator.clipboard.writeText(url)}>Copy</CopyButton>
      </LinkContainer>
    </PaddedCenteredContainer>
  );
};

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LinkText = styled.p`
  font-size: 0.8rem;
  padding: 10px;
  border: lightgray;
  border-width: thin;
  border-style: solid;
  border-radius: 10px;
  margin: 10px;
`;

const CopyButton = styled.button`
    height: 2rem;
`

export default ShareLink;
