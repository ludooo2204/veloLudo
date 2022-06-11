import styled from '@emotion/native';

export const DefaultColorsText = styled.Text`
  background-color: black;
  color: white;
  text-align: center;
`;
export const CompteurText = styled.Text`
  font-family: 'sans-serif-thin';
  font-style: italic;
  font-weight: bold;
  color: white;
  font-size: ${(props) => (props.fontSize ? props.fontSize : 20)};
`;
