'use client'

const StatusModal = (props) => {
    const {winner,handleRestart} = props
    return (
        <>
            <dialog id="my_modal_1">
                <div className="modal-box">
                    <h3 className="font-bold text-lg flex justify-center items-center h-64">{winner}</h3>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="flex justify-center items-center" onClick={handleRestart}>play again</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default StatusModal;
