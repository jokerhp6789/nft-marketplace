const getItemFromMarketplace = async (marketplace, nft, itemId) => {
  const item = await marketplace.items(itemId);
  console.log(item);
  if (item) {
    // get uri url from nft contract
    const uri = await nft?.tokenURI(item?.tokenId);
    // use uri to fetch the nft metadata stored on ipfs
    const response = await fetch(uri);
    const metadata = await response.json();
    // get total price of item (item price + fee)
    const totalPrice = await marketplace?.getTotalPrice(item.itemId);
    // Add item to items array
    return {
      item,
      metadata,
      totalPrice
    };
  }
};

export const loadMarketplaceItems = async (marketplace, nft, itemId = null) => {
  // Load all unsold items
  const itemCount = await marketplace?.itemCount();
  let items = [];
  if (!itemId) {
    for (let i = 1; i <= itemCount; i++) {
      const {
        item,
        totalPrice,
        metadata
      } = await getItemFromMarketplace(marketplace, nft, i);
      
      items.push({
        totalPrice,
        itemId: item.itemId,
        seller: item.seller,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        sold: item.sold
      });
    }
  } else {
    const {
      item,
      totalPrice,
      metadata
    } = await getItemFromMarketplace(marketplace, nft, itemId);
    
    items.push({
      totalPrice,
      itemId: item.itemId,
      seller: item.seller,
      name: metadata.name,
      description: metadata.description,
      image: metadata.image,
      sold: item.sold
    });
  }
  
  return items;
};