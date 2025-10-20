import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack /> Create
          </button>

          <Modal>
            <Modal.Open opens="edit">
              <button>
                <HiPencil /> Edit
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Open opens="delete">
              <button>
                <HiTrash /> Delete
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                disabled={isDeleting}
                rsourceName="cabins"
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>

          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button>Duplicate</Menus.Button>
              <Menus.Button>Edit</Menus.Button>
              <Menus.Button>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </TableRow>
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    discount: PropTypes.number,
    id: PropTypes.number,
    image: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number,
    name: PropTypes.string.isRequired,
    regularPrice: PropTypes.number,
  }),
};

export default CabinRow;
