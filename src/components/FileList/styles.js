import styled from 'styled-components';

export const Container = styled.div`
  ul {
    margin-top: 20px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #444;

      div {
        display: flex;
      }

      & + li {
        margin-top: 15px;
      }
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: #999;

      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;