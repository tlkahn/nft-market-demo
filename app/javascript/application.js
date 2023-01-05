// Entry point for the build script in your package.json
// import "@hotwired/turbo-rails"
import { Turbo } from '@hotwired/turbo-rails';
Turbo.session.drive = false;

import './controllers';
import * as bootstrap from 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';

import jquery from 'jquery';
window.jQuery = jquery;
window.$ = jquery;

import 'slick-carousel/slick/slick';

import Identicon from 'identicon.js';

const csrfToken = $('meta[name="csrf-token"]').attr('content');
console.log(`x csrf token: ${csrfToken}`);

import { ethers } from 'ethers';
window.ethers = ethers;

const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
const signer = provider.getSigner();
var addrPromise = signer.getAddress();
const contractAddress = '0xBdb580A64EC2d08c882AcbA65C42dAba4F212626';
const NETWORK_ID = 1;

async function fetchContract(contractAddress) {
  const abi = [
    {
      inputs: [
        {
          internalType: 'string',
          name: '_name',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_symbol',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_baseURI',
          type: 'string',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'MaxSupply',
      type: 'error',
    },
    {
      inputs: [],
      name: 'MintPriceNotPaid',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NonExistentTokenURI',
      type: 'error',
    },
    {
      inputs: [],
      name: 'WithdrawTransfer',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'approved',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'string',
          name: 'uri',
          type: 'string',
        },
      ],
      name: 'TokenMinted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [],
      name: 'MINT_PRICE',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'TOTAL_SUPPLY',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'baseURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 's1',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 's2',
          type: 'string',
        },
      ],
      name: 'compareStringsbyBytes',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'currentTokenId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getApproved',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'uri',
          type: 'string',
        },
      ],
      name: 'getTokenIdByURI',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'uri',
          type: 'string',
        },
      ],
      name: 'mintTo',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ownerOf',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'tokenByIndex',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'tokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address payable',
          name: 'payee',
          type: 'address',
        },
      ],
      name: 'withdrawPayments',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];
  return new ethers.Contract(contractAddress, abi, signer);
}

let popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});
var dropdownElementList = [].slice.call(
  document.querySelectorAll('.dropdown-toggle')
);
var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl);
});

var globalSearchOptions = {};

function updateGlobalSearchOptions(options) {
  $('.filter-wrapper')
    .find('button[data-bs-toggle="dropdown"]')
    .map(function (i, el) {
      globalSearchOptions[$(el).data().searchOption] = $(el).text().trim();
    });
  console.log(globalSearchOptions);
}

$('.dropdown-menu button').on('click', function () {
  let query = $(this).text().trim();
  let dropdownBtn = $(this)
    .closest('.dropdown')
    .find('button[data-bs-toggle="dropdown"]');
  dropdownBtn.text(query).attr('data-value', query);
  let searchOption = $(this)
    .closest('.dropdown')
    .find('button.dropdown-toggle')
    .data().searchOption;
  globalSearchOptions[searchOption] = query;
  console.log(globalSearchOptions);
});

const getBootstrapDeviceSize = () => {
  return $('#device-size-detector').find('div:visible').first().attr('id');
};

const slickableOption = {
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  infinite: true,
  centerMode: true,
  arrows: true,
};
const reslick = (slickableOption) => {
  restoreAll('slickable-clone');
  let size = getBootstrapDeviceSize();
  switch (size) {
    case 'xs':
      slickableOption.slidesToShow = 1;
      break;
    case 'sm':
      slickableOption.slidesToShow = 2;
      break;
    case 'md':
      slickableOption.slidesToShow = 2;
      break;
    case 'lg':
      slickableOption.slidesToShow = 3;
      break;
    default:
      slickableOption.slidesToShow = 3;
      break;
  }
  $('.slickable').slick(slickableOption);
};

const cloneAll = (className) => {
  console.assert(typeof className == 'string');
  let selector = '.' + className;
  $(selector).each(function (_, el) {
    let clone = $(el).clone();
    clone.appendTo(el.parentNode);
    clone.removeClass(className);
    clone.addClass(`${className}-clone`);
    clone.css('display', 'none');
  });
};

const removeSuffix = (str, suffix) => {
  if (str.indexOf(suffix, str.length - suffix.length) !== -1) {
    return str.substring(0, str.length - suffix.length);
  }
  return str;
};

const restoreAll = (className) => {
  console.assert(typeof className == 'string');
  let selector = '.' + className;
  let originalClassName = removeSuffix(className, '-clone');
  let originalSelector = '.' + originalClassName;
  $(originalSelector).each(function (index, el) {
    $(el).remove();
  });
  $(selector).each(function (index, el) {
    let clone = $(el).clone();
    clone.appendTo(el.parentNode);
    clone.removeClass(className);
    clone.addClass(originalClassName);
    clone.css('display', 'block');
  });
};

cloneAll('slickable');

reslick(slickableOption);
$(window).on('resize', () => {
  reslick(slickableOption);
});

/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
window.readURL = (input, image_container_id) => {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#' + image_container_id).attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
};

/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var inputs = document.querySelectorAll('.upload');
var termOfUseStatus = false;
for (let input of inputs) {
  if (input) {
    input.addEventListener('change', showFileName);
  }
}
function showFileName(event) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
}

$('.input-group-append').on('click', function () {
  $(this).prev().find('input').trigger('click');
});

$('#term-of-use-check').on('change', function () {
  $(this).parent().removeClass('term-of-use-check-error');
  termOfUseStatus = $(this).is(':checked');
});

$('.wallet-card button').on('click', async function () {
  if (termOfUseStatus) {
    // Prompt user for account connections
    const rt = $('#random-text').val();
    await provider.send('eth_requestAccounts', []);
    const addr = await addrPromise;
    const sig = await provider.send('personal_sign', [rt, addr]);
    // To see a full list of chain ID as defined by EIP-155, see:
    // https://chainlist.org/ or
    // https://github.com/DefiLlama/chainlist
    const chainId = await provider.send('eth_chainId', []);
    // Or using signer
    // let signature = await signer.signMessage("Hello World");
    console.log('random text: ', rt);
    console.log('wallet address:', addr);
    console.log('signed:', sig);
    console.log('chainId:', chainId);
    console.log('computed addr: ', ethers.utils.verifyMessage(rt, sig));
    $.ajax('/sign_in', {
      //   beforeSend: function (xhr) {
      //     xhr.setRequestHeader('X-CSRF-Token', csrfToken);
      //   },
      headers: {
        'X-CSRF-Token': csrfToken,
      },
      method: 'POST',
      data: {
        random_text: rt,
        wallet_address: addr,
        signature: sig,
        chain_id: chainId,
      },
    }).done(function (data) {
      if (data.message == 'success' && data.status_code == '200') {
        window.location.href = '/';
      }
    });
  } else {
    $('#term-of-use-check').parent().addClass('term-of-use-check-error');
  }
});

$('.redeem-box').on('click', function () {
  $(this).toggleClass('redeem-box-active');
  if ($(this).hasClass('redeem-box-active')) {
    $(this)
      .closest('.redeem-box-set')
      .find('.redeem-box')
      .not(this)
      .removeClass('redeem-box-active');
  }
});

function getProgressBarModal() {
  return new bootstrap.Modal(
    document.getElementById('progress-bar-wrapper'),
    {}
  );
}

$('#new-item-create-button').on('click', function () {
  let progressBarModal = getProgressBarModal();
  progressBarModal.show();
  let name = $('#new-item-name-input').val();
  let imageData = $('.upload-wrapper').find('input')[0].files[0];
  let price_eth = $('#new-item-price-input').val();
  let collection = $('#select-collection-dropdown').data().value.trim();
  let description = $('#new-item-description-text').val();
  let royalties = $('#new-item-royalties-input').val();
  let youtubeUrl = $('#new-item-youtube-url-input').val();
  var formData = new FormData();
  formData.append('image_file', imageData);
  formData.append('name', name);
  formData.append('price_eth', price_eth);
  formData.append('collection', collection);
  formData.append('description', description);
  formData.append('royalties', royalties);
  formData.append('contract_address', contractAddress);
  formData.append('network_id', NETWORK_ID);
  formData.append('youtube_url', youtubeUrl);
  $.post({
    url: '/mint',
    data: formData,
    processData: false,
    contentType: false,
    headers: {
      'X-CSRF-Token': csrfToken,
    },
  })
    .done(async (data) => {
      console.log({ data });
      let itemId = data.item_id;
      const contract = await fetchContract(contractAddress);
      const tokenURI = data.metadata_ipfs_url;
      console.log({ tokenURI });
      filter = {
        address: contractAddress,
        topics: [
          // the name of the event, parnetheses containing the data type of each event, no spaces
          ethers.utils.id('TokenMinted(address,uint256,string)'),
        ],
      };
      provider.on(filter, (res) => {
        console.log('TokenMinted', res);
        let tokenId = parseInt(res.topics[2].slice(2), 16);
        console.log('token_id', tokenId);
        // $.post({
        //   url: '/update',
        //   data: {
        //     field_name: 'token_id',
        //     item_id: itemId,
        //     token_id: tokenId,
        //   },
        // })
        // .done(() => {
        //   console.log('token_id updated');
        // })
        // .fail(() => {
        //   console.log('token_id update failed');
        // });
      });
      $('.item-progress-bar').attr('aria-valuenow', '90');
      $('.item-progress-text').text('Minting NFT now...');
      try {
        const addr = await addrPromise;
        contract
          .mintTo(addr, tokenURI, {
            value: ethers.utils.parseEther('0.08'),
          })
          .then(
            (res) => {
              console.log({ res });
              $('.progress-bar').attr('aria-valuenow', '90');
              $('.progress-text').text('Updating tx hash...');
              $.post({
                url: '/update',
                data: {
                  field_name: 'tx_hash',
                  tx_hash: res.hash,
                  item_id: itemId,
                },
                headers: {
                  'X-CSRF-Token': csrfToken,
                },
              })
                .done((res) => {
                  console.log({ res });
                  progressBarModal.hide();
                  $('input, textarea').val('');
                  $('.image-area').find('img').attr('src', '#');
                  $('html, body').animate({ scrollTop: 0 }, 'slow');
                  $('.flash-message').html(
                    '<div class="flash-notice alert-dismissible alert alert-success" role="alert">Token successfully minted' +
                      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
                  );
                })
                .fail(() => {})
                .always(() => {});
            },
            (err) => {
              console.log(
                'Error encounterd when minting ERC-721 compliant NFT',
                err
              );
              console.log('Rolling back db record for itemId: ', itemId);
              deleteItem(itemId, progressBarModal, err);
            }
          );
      } catch (error) {
        console.log('Catch-all error handler:', { error });
        deleteItem(itemId, progressBarModal, error);
      }
    })
    .fail((xhr, status, error) => {
      let err = xhr.responseText;
      progressBarModal.hide();
      $('html, body').animate({ scrollTop: 0 }, 'slow');
      $('.flash-message').html(
        '<div class="flash-alert alert-dismissible alert alert-success" role="alert"> Error encountered when minting NFT' +
          JSON.stringify(err) +
          '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
      );
    });
});

function deleteItem(itemId, progressBarModal, msg) {
  $.post({
    url: '/items/:id/destroy',
    data: {
      item_id: itemId,
    },
    headers: {
      'X-CSRF-Token': csrfToken,
    },
  }).done((res) => {
    console.log('db record rolled back', { res });
    progressBarModal.hide();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    $('.flash-message').html(
      '<div class="flash-alert alert-dismissible alert alert-success" role="alert"> Error encountered when minting NFT' +
        JSON.stringify(msg) +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    );
  });
}

$('#modal-new-collection-create-button').on('click', function () {
  let progressBarModal = getProgressBarModal();
  progressBarModal.show();
  let name = $('#collection-name-input').val();
  let imageData = $('#create-new-collection')
    .find('.upload-wrapper')
    .find('input')[0].files[0];
  var formData = new FormData();
  formData.append('image_file', imageData);
  formData.append('name', name);
  $.post({
    url: '/collections',
    data: formData,
    processData: false,
    contentType: false,
    headers: {
      'X-CSRF-Token': csrfToken,
    },
  }).done(async (data) => {
    console.log({ data });
    let toastLiveExample;
    if (data.status == 'success') {
      toastLiveExample = document.getElementById('liveToastOk');
    } else {
      toastLiveExample = document.getElementById('liveToastFail');
    }
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
    progressBarModal.hide();
    $('#create-new-collection')
      .find("[data-bs-dismiss='modal']")
      .trigger('click');
    window.location = '/collections';
  });
});

const userAvatar = $('.user-avatar');
var userEthAddr = userAvatar.data('eth-addr');
if (!userEthAddr) {
  userEthAddr = '0x' + '0'.repeat(20);
}
var data = new Identicon(userEthAddr, { format: 'svg' }).toString();
userAvatar.attr('src', 'data:image/svg+xml;base64,' + data);

$('.collections-title').on('click', () => {
  location.reload();
});

$('#filter-apply-btn').on('click', function () {
  updateGlobalSearchOptions();
  let searchQuery = new URLSearchParams(globalSearchOptions).toString();
  let searchUrl = window.location.origin + '/explore?' + searchQuery;
  window.location = searchUrl;
});

import './channels';

function openseaUrl(tokenId, network) {
  switch (network) {
    case 'rinkeby':
      return `https://testnets.opensea.io/assets/rinkeby/${contractAddress}/${tokenId}`;
    case 'ropsten':
      return `https://testnets.opensea.io/assets/ropsten/${contractAddress}/${tokenId}`;
    case 'mainnet':
      return `https://opensea.io/assets/${contractAddress}/${tokenId}`;
    default:
      throw 'unknown network';
  }
}

async function fetchNFTTokenId(network, contractAddress) {
  await provider.send('eth_requestAccounts', []);
  let contract = await fetchContract(contractAddress);
  let ipfs_hash = $('.metadata-ipfs-hash').text().trim();
  let ipfs_uri = 'ipfs://' + $('.metadata-ipfs-hash').text().trim();
  console.log({ ipfs_uri, ipfs_hash });
  if (ipfs_hash.length > 0) {
    contract.getTokenIdByURI(ipfs_uri).then(
      (tokenId) => {
        console.log(tokenId.toNumber());
        console.log(contractAddress);
        console.log(openseaUrl(tokenId.toNumber(), network));
        let itemId = $('.item-id').text().trim();
        $.post({
          url: '/update',
          data: {
            field_name: 'token_id',
            item_id: itemId,
            token_id: tokenId.toNumber(),
          },
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        })
          .done((res) => {
            console.log('token_id updated', { res });
          })
          .fail((xhr, status, err) => {
            console.log('Catch-all error handler:', {
              error: xhr.responseText,
            });
          })
          .always(() => {});

        $('#buy-item-btn').attr(
          'href',
          openseaUrl(tokenId.toNumber(), network)
        );
        $('#buy-item-btn').css({
          display: 'block',
        });
        $('#loading-item-btn').hide();
        $('.metadata-token-id').text(tokenId);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

if ($('.contract-address').length > 0) {
  fetchNFTTokenId('rinkeby', $('.contract-address').html().trim()).then(() => {
    console.log('fetching NFT token id done...');
  });
}

if ($('#new-item-create-button, #create-new-collection').length > 0) {
  console.log('new item create button found');
  provider.send('eth_requestAccounts', []).then((res) => {
    res.forEach((account) => {
      console.log({ metamaskAccount: account });
    });
  });
}
