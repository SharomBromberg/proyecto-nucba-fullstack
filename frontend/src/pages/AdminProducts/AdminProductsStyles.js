import styled from "styled-components";
import { breakpoints } from "../../components/UI/Breakpoints/breakpoints";

export const AdminWrapper = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 3rem;
  background: linear-gradient(
    135deg,
    rgba(18, 18, 31, 0.95),
    rgba(33, 8, 54, 0.9)
  );
  border-radius: 24px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.5);
  color: #ffffff;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 2rem;
    margin: 2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1.25rem;
    margin: 1rem;
    width: 95%;
  }
`;

export const AdminHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.6rem;
    font-weight: 800;
    text-shadow: 0 4px 12px rgba(255, 0, 84, 0.45);
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    max-width: 46rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 0.25rem;
    margin-bottom: 1.5rem;
    h1 {
      font-size: 2.1rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

export const AdminContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
    	@media (max-width: ${breakpoints.mobile}) {
		gap: 1.5rem;
	}
`;

export const ProductsPanel = styled.div`
  background: rgba(15, 15, 30, 0.8);
  border-radius: 20px;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }
    @media (max-width: ${breakpoints.mobile}) {
		padding: 1.25rem;
	}
`;

export const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  h2 {
    font-size: 1.5rem;
  }

  select {
    background: rgba(10, 10, 25, 0.85);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.6rem 1rem;
    border-radius: 12px;
    transition: border 0.2s ease, box-shadow 0.2s ease;
    &:focus {
      outline: none;
      border-color: rgba(200, 162, 255, 0.8);
      box-shadow: 0 0 0 3px rgba(200, 162, 255, 0.25);
    }
    option {
      color: #0f1324;
      background: #ffffff;
    }
  }
    	@media (max-width: ${breakpoints.mobile}) {
		flex-direction: column;
		align-items: flex-start;
		select {
			width: 100%;
		}
	}
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 520px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

export const ProductCard = styled.article`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  border: 1px solid transparent;
  transition: border 0.2s ease;

  &:hover {
    border-color: rgba(255, 0, 84, 0.6);
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 12px;
  }

  h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  span {
    display: inline-block;
    margin-top: 0.4rem;
    font-size: 0.9rem;
    color: #cfcfcf;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 60px 1fr;

    button {
      margin-top: 0.8rem;
    }
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 0.6rem;

  button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

export const FormPanel = styled.div`
  background: rgba(15, 15, 30, 0.85);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }
`;

export const FormTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.5rem;
    margin: 0;
  }

  span {
    font-size: 0.9rem;
    padding: 0.2rem 0.8rem;
    border-radius: 999px;
    background: rgba(255, 0, 84, 0.15);
    color: #ff9ac9;
    text-transform: uppercase;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.95rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.9rem 1rem;
    background: rgba(17, 13, 28, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    color: #ffffff;
    font-size: 1rem;
    transition: border 0.2s ease, box-shadow 0.2s ease;
  }

  select,
  option {
    color-scheme: dark;
  }

  select option {
    color: #0f1324;
    background: #ffffff;
  }

  select:focus,
  input:focus,
  textarea:focus {
    outline: none;
    border-color: rgba(255, 154, 201, 0.85);
    box-shadow: 0 0 0 3px rgba(255, 154, 201, 0.35);
  }

  textarea {
    min-height: 110px;
    resize: none;
  }

  input[type="checkbox"] {
    width: auto;
    accent-color: #ff0054;
  }
`;

export const InlineGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const UploadField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input[type="file"] {
    padding: 0.7rem;
    border: 1px dashed rgba(255, 255, 255, 0.25);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.02);
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }

  small {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const ImagesPreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 0.75rem;
`;

export const PreviewThumb = styled.div`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);

  img {
    width: 100%;
    height: 90px;
    object-fit: cover;
    display: block;
  }

  button {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    cursor: pointer;
    font-size: 0.8rem;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

export const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 16px;
`;
