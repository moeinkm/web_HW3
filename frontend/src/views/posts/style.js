import styled from "styled-components";
import { Button } from "antd";

export const StyleImg = styled.img`
  width: 35px;
  height: 35px;
  margin: 0 10px;
`;

export const StyledName = styled.div`
  font-size: 16px;
  color: #333;
  text-align: left;
  font-weight: 600;
`;

export const StyledTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #222;
  text-align: left;
  margin: 10px 55px;
`;

export const StyledDescription = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  text-align: left;
  margin: 5px 55px;
`;

export const StyledButton = styled(Button)`
  float: right;
`;
