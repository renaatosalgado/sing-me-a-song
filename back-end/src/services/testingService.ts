import testingRepository from "../repositories/testingRepository.js";

async function resetAll() {
  await testingRepository.deleteAll();
}

export default {
  resetAll,
};
