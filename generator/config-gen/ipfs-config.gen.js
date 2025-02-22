async function genIpfsConfig(config, outputCfg) {
  const ipfsConfig = {
    swarm_port: 4001,
    api_port: 5001,
    gateway_port: 37773,
    path: '/opt/mannheimnetwork/data/ipfs'
  }
  return {
    config: ipfsConfig,
    paths: [{
      required: true,
      path: '/opt/mannheimnetwork/data/ipfs',
    }],
  }
}

async function genIpfsComposeConfig(config) {
  return {
    image: 'mannheimnetwork/go-ipfs:latest',
    network_mode: 'host',
    restart: 'always',
    volumes: [
      '/opt/mannheimnetwork/data/ipfs:/data/ipfs'
    ],
    entrypoint: '/sbin/tini --',
    environment: {
      IPFS_PROFILE: 'leveldb',
    },
    logging: {
      driver: "json-file",
      options: {
        "max-size": "500m"
      }
    },
    command: '/bin/sh -c "/usr/local/bin/start_ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/37773 && /usr/local/bin/start_ipfs config Datastore.StorageMax 250GB && /usr/local/bin/start_ipfs bootstrap add /ip4/101.33.32.103/tcp/4001/p2p/12D3KooWEVFe1uGbgsDCgt9GV5sAC864RNPPDJLTnX9phoWHuV2d && /usr/local/bin/start_ipfs daemon --enable-gc --migrate=true"',
  }
}

module.exports = {
  genIpfsConfig,
  genIpfsComposeConfig,
}
