import pipedrive from "~/src/config/pipedrive";

class PipedriveService {
  dealsController = pipedrive.DealsController;

  getAllWonDeals() {
    return this.dealsController.getAllDeals({ status: "won" });
  }
}

export const pipedriveService = new PipedriveService();
