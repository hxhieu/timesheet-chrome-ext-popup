import React, { useEffect } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div``;

interface Props {
  date: string;
}

const DayGauge = ({ date }: Props): JSX.Element => {
  return <Wrapper>{date}</Wrapper>;
};

export default DayGauge;
