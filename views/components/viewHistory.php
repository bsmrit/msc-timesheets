<div id="view-history-popup" class="modal" style="display:none;">
    <div class="container px-4">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title green text-center montserrat pl-5" id="exampleModalLongTitle">Employee Status History</h5>
            <h5 id="close-view-history-popup" class="a btn float-right px-3 py-0 text-danger radius">&#x2715;</h5>
          </div>
          <div class="modal-body">
            <table id="history-table" class="table table-responsive-sm table-hover table-bordered">
                <thead>
                    <tr class="green-fond white">
                        <th scope="col">Date/Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Comment</th>
                    </tr>
                </thead>
                <tbody id="history-body">
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</div>
