export const ProductImages = ({item}) => {
  const {file, title} = item;

  return (
    <div className='product-image-card'>
      <img className='product-image-card__img' src={file} alt={title} />
    </div>
  )
}

export default ProductImages;
