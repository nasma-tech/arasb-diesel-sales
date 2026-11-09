$(function() {
    $('#customer_number').numberInput(11)
    function documentInput() {
        return `
            <div class="col-md-4 mt-2 document-item">
                <div class="input-group">
                    <input type="file" class="form-control" name="complaint_document[]" required>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-danger removeDocument">
                            <i class="bx bx-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    $('.addDocument').on('click', function() {
        $('.DocDiv').append(documentInput());
    });

    $('.DocDiv').on('click', '.removeDocument', function() {
        $(this).closest('.document-item').remove();
    });
});