document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.more-info').addEventListener('click', function() {
        const moreDetails = document.querySelector('.more-details');
        moreDetails.style.display = moreDetails.style.display === 'none' ? 'block' : 'none';
    });
});